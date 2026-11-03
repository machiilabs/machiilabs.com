#!/usr/bin/env python3
"""Send a Mach II Labs newsletter issue or correction through iCloud SMTP, one message per subscriber.

  send-mailing.py issue SLUG --list FILE --dry-run       show the first message; sends nothing
  send-mailing.py issue SLUG --list FILE --test EMAIL    send one [Test] copy to EMAIL
  send-mailing.py issue SLUG --list FILE                 send to the list (asks first)
  send-mailing.py correction SLUG --list FILE ...        the same for an issue's correction

The process around this script is .claude/skills/newsletter/SKILL.md. Every
send, test or real, first runs `npm run newsletter send-check`, which enforces
the rules: approved and unchanged since approval, one newsletter a calendar
month, one correction per issue within 30 days of it, and so on.

The content comes from the live site (machiilabs.com/newsletter/SLUG/email),
and must match what was approved byte for byte. --site points --dry-run and
--test at a dev server; a real send only uses machiilabs.com.

LIST: the admin page's "Generate mailing list" output, `email, token` per line.
A correction goes only to people who got the issue and are still on the list.

Sign-in comes from the Keychain. Set it up once (it prompts for the password):
  security add-generic-password -s machii-mailer -a YOUR_ICLOUD_LOGIN -w

Progress is kept in ~/Documents/Mailings/SLUG/. A rerun skips anyone already
sent, so after a stop (daily cap, network) run the same command again.
"""

import argparse
import hashlib
import json
import re
import smtplib
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from email.utils import formatdate, make_msgid, parseaddr
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY = ROOT / "src/lib/newsletter/registry.json"
MAILINGS = Path.home() / "Documents/Mailings"

SENDER = "Mach II Labs <support@machiilabs.com>"
SITE = "https://machiilabs.com"
SMTP_HOST, SMTP_PORT = "smtp.mail.me.com", 587
KEYCHAIN_SERVICE = "machii-mailer"
ONE_CLICK_URL = "https://machiilabs.com/api/mailing-list/unsubscribe?token={token}"
PLACEHOLDER = "~unsubscribe_token"
DAILY_CAP = 900  # iCloud allows 1,000 messages a day; leave room for support mail
PAUSE_SECONDS = 1.0
TEST_TOKEN = "00000000-0000-4000-8000-000000000000"

LINE_RE = re.compile(
    r"^([^\s,@]+@[^\s,@]+\.[^\s,@]+),\s*"
    r"([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$",
    re.I,
)


def fail(message):
    sys.exit(f"send-mailing: {message}")


def read_list(path):
    subscribers, bad = {}, []
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        match = LINE_RE.match(line.strip())
        if match:
            subscribers.setdefault(match[1].lower(), match[2].lower())
        else:
            bad.append(number)
    if bad:
        which = f"line {bad[0]} is" if len(bad) == 1 else f"lines {', '.join(map(str, bad))} are"
        fail(f"{path}: {which} not `email, token`")
    if not subscribers:
        fail(f"{path}: no subscribers")
    return subscribers


def send_check(slug, kind, test):
    """The rules, from scripts/newsletter.ts. Returns its verdict."""
    args = ["npx", "tsx", "scripts/newsletter.ts", "send-check", slug]
    if kind == "correction":
        args.append("--correction")
    if test:
        args.append("--test")
    result = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
    try:
        return json.loads(result.stdout.strip().splitlines()[-1])
    except (IndexError, json.JSONDecodeError):
        fail(f"send-check didn't answer:\n{result.stderr.strip() or result.stdout.strip()}")


def newsletter(*args):
    subprocess.run(["npx", "tsx", "scripts/newsletter.ts", *args], cwd=ROOT, check=True)


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "send-mailing"})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.headers, response.read()
    except urllib.error.HTTPError as error:
        return error.code, error.headers, b""
    except urllib.error.URLError as error:
        fail(f"can't reach {url}: {error.reason}")


def fetch_content(site, slug, kind):
    page = f"{site}/newsletter/{slug}"
    email = f"{page}/email" if kind == "issue" else f"{page}/correction/email"
    status, _, _ = fetch(page)
    if status != 200:
        fail(f"{page} answered {status}. The page must be live first, so View in browser works.")
    status, headers, html = fetch(email)
    if status != 200:
        fail(f"{email} answered {status}")
    status, _, text = fetch(f"{email}/text")
    if status != 200:
        fail(f"{email}/text answered {status}")
    subject = urllib.parse.unquote(headers.get("X-Newsletter-Subject", ""))
    return subject, html, text


def build_message(subject, text, html, recipient, token):
    quoted = urllib.parse.quote(token)
    address = parseaddr(SENDER)[1]
    msg = EmailMessage()
    msg["From"] = SENDER
    msg["To"] = recipient
    msg["Subject"] = subject
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=address.split("@")[1])
    msg["List-Unsubscribe"] = (
        f"<{ONE_CLICK_URL.format(token=quoted)}>, <mailto:{address}?subject=unsubscribe>"
    )
    msg["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click"
    msg.set_content(text.replace(PLACEHOLDER, quoted))
    msg.add_alternative(html.replace(PLACEHOLDER, quoted), subtype="html")
    return msg


def keychain_login():
    found = subprocess.run(
        ["security", "find-generic-password", "-s", KEYCHAIN_SERVICE],
        capture_output=True, text=True,
    )
    account = re.search(r'"acct"<blob>="([^"]*)"', found.stdout)
    if found.returncode != 0 or not account:
        fail(
            "no iCloud sign-in in the Keychain. Run:\n"
            f"  security add-generic-password -s {KEYCHAIN_SERVICE} -a YOUR_ICLOUD_LOGIN -w"
        )
    password = subprocess.run(
        ["security", "find-generic-password", "-s", KEYCHAIN_SERVICE, "-w"],
        capture_output=True, text=True,
    ).stdout.rstrip("\n")
    return account[1], password


def connect():
    login, password = keychain_login()
    smtp = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=60)
    smtp.starttls(context=ssl.create_default_context())
    try:
        smtp.login(login, password)
    except smtplib.SMTPAuthenticationError:
        fail(f"iCloud refused the sign-in for {login}. Check the app-specific password.")
    return smtp


def send_one(smtp, msg):
    """Send, reconnecting once if iCloud dropped the connection. Returns the connection."""
    try:
        smtp.send_message(msg)
        return smtp
    except smtplib.SMTPServerDisconnected:
        smtp = connect()
        smtp.send_message(msg)
        return smtp


def read_log(path):
    """{email: status} for everyone the log has tried; the latest attempt wins."""
    statuses = {}
    if path.exists():
        for line in path.read_text(encoding="utf-8").splitlines():
            _, email, status = (line.split("\t") + ["", ""])[:3]
            statuses[email] = status
    return statuses


def sent_last_24_hours():
    """Messages sent from any mailing, for iCloud's daily limit."""
    since = datetime.now(timezone.utc) - timedelta(days=1)
    total = 0
    for log in MAILINGS.glob("*/*.log"):
        for line in log.read_text(encoding="utf-8").splitlines():
            stamp, _, status = (line.split("\t") + ["", ""])[:3]
            if status == "sent" and datetime.fromisoformat(stamp) > since:
                total += 1
    return total


def now_local():
    return datetime.now().astimezone().isoformat(timespec="seconds")


def unfinished_entry(registry, slug, kind):
    return next((e for e in registry["sends"] if e["issue"] == slug and e["kind"] == kind and not e["finishedAt"]), None)


def read_registry():
    return json.loads(REGISTRY.read_text(encoding="utf-8"))


def write_registry(registry):
    REGISTRY.write_text(json.dumps(registry, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("kind", choices=["issue", "correction"])
    parser.add_argument("slug", help="the issue, e.g. 2026-01")
    parser.add_argument("--list", required=True, type=Path, help="the admin page's mailing list")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="show the first message; send nothing")
    mode.add_argument("--test", metavar="EMAIL", help="send one [Test] copy to EMAIL")
    parser.add_argument("--site", default=SITE, help=f"where to fetch from (default {SITE}); only for --dry-run and --test")
    args = parser.parse_args()
    site = args.site.rstrip("/")
    real = not (args.dry_run or args.test)
    if real and site != SITE:
        fail(f"a real send only uses {SITE}; --site is for --dry-run and --test")

    subscribers = read_list(args.list)
    folder = MAILINGS / args.slug
    folder.mkdir(parents=True, exist_ok=True)
    log_path = folder / f"{args.kind}.log"

    # The rules. A dry run reports them; anything that sends must pass them.
    verdict = send_check(args.slug, args.kind, test=not real)
    if not verdict["ok"]:
        problems = "\n  ".join(verdict["problems"])
        if not args.dry_run:
            fail(f"can't send {args.kind} {args.slug}:\n  {problems}")
        print(f"(not sendable yet:\n  {problems})\n")

    # The content, from the site. From machiilabs.com it must be exactly what was approved.
    subject, html, text = fetch_content(site, args.slug, args.kind)
    if site == SITE:
        served = (hashlib.sha256(html).hexdigest(), hashlib.sha256(text).hexdigest())
        if served != (verdict["htmlSha256"], verdict["textSha256"]):
            fail(f"{SITE} isn't serving the approved version of {args.slug}. Merge the approved pull request first.")
    html, text = html.decode("utf-8"), text.decode("utf-8")

    # Who gets it. A correction goes only to people who got the issue.
    if args.kind == "correction":
        got_issue = {e for e, s in read_log(folder / "issue.log").items() if s == "sent"}
        if real and not got_issue:
            fail(f"{folder / 'issue.log'} has no record of who got {args.slug}")
        recipients = {e: t for e, t in subscribers.items() if e in got_issue}
    else:
        recipients = subscribers

    if args.dry_run:
        email, token = next(iter(recipients.items()), next(iter(subscribers.items())))
        msg = build_message(subject, text, html, email, token)
        preview = folder / f"{args.kind}-preview.html"
        preview.write_text(msg.get_body(("html",)).get_content(), encoding="utf-8")
        for key in ("From", "To", "Subject", "List-Unsubscribe", "List-Unsubscribe-Post"):
            print(f"{key}: {msg[key]}")
        print("\n" + msg.get_body(("plain",)).get_content())
        print(f"(dry run: {len(recipients)} recipients, nothing sent. HTML preview: {preview})")
        return

    if args.test:
        email = args.test.strip().lower()
        msg = build_message(f"[Test] {subject}", text, html, email, subscribers.get(email, TEST_TOKEN))
        send_one(connect(), msg).quit()
        print(f"Sent a test to {email}. Check it, then run without --test.")
        return

    # The real send.
    done = read_log(log_path)
    pending = [(e, t) for e, t in recipients.items() if done.get(e) not in ("sent", "refused")]
    if not pending:
        fail(f"everyone has this {args.kind} already (see {log_path})")
    room = DAILY_CAP - sent_last_24_hours()
    if room <= 0:
        fail(f"{DAILY_CAP} sent in the last 24 hours; run the same command again tomorrow")
    batch = pending[:room]
    resuming = f" (resuming; {len(recipients) - len(pending)} already done)" if verdict.get("resuming") else ""
    later = f"; {len(pending) - len(batch)} wait for tomorrow" if len(batch) < len(pending) else ""
    answer = input(f'Send "{subject}" to {len(batch)} recipients{resuming}{later}? [y/N] ')
    if answer.strip().lower() != "y":
        print("Nothing sent.")
        return

    # The ledger holds the month's slot from the moment a send starts.
    registry = read_registry()
    if not unfinished_entry(registry, args.slug, args.kind):
        registry["sends"].append({
            "issue": args.slug, "kind": args.kind, "startedAt": now_local(),
            "finishedAt": None, "recipients": len(recipients),
        })
        write_registry(registry)

    smtp = connect()
    sent = failed = in_a_row = 0
    with log_path.open("a", encoding="utf-8") as log:
        for number, (email, token) in enumerate(batch, 1):
            status = "sent"
            try:
                smtp = send_one(smtp, build_message(subject, text, html, email, token))
                sent += 1
                in_a_row = 0
            except smtplib.SMTPRecipientsRefused:
                status = "refused"
                failed += 1
            except smtplib.SMTPResponseException as error:
                status = f"error {error.smtp_code}"
                failed += 1
                in_a_row += 1
            stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
            log.write(f"{stamp}\t{email}\t{status}\n")
            log.flush()
            print(f"\r  {number}/{len(batch)} · {sent} sent · {failed} failed", end="", flush=True)
            if in_a_row == 3:
                print(f"\nStopped: iCloud refused three in a row ({status}). Run the same command later to resume.")
                break
            time.sleep(PAUSE_SECONDS)
    smtp.quit()
    print(f"\nLog: {log_path}")

    # Finished once everyone has been sent to or refused for good.
    done = read_log(log_path)
    left = sum(done.get(e) not in ("sent", "refused") for e in recipients)
    if left:
        print(f"{left} still to send. Run the same command again to finish.")
        return
    registry = read_registry()
    unfinished_entry(registry, args.slug, args.kind)["finishedAt"] = now_local()
    write_registry(registry)
    newsletter("freeze" if args.kind == "issue" else "correction-sent", args.slug)
    print("Finished. Next: commit the registry and frozen copy in a pull request (the skill's close step).")


if __name__ == "__main__":
    main()
