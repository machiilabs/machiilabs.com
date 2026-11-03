#!/usr/bin/env python3
"""Send a Mach II Labs announcement, one message per subscriber, through iCloud SMTP.

  send-mailing.py DRAFT LIST --dry-run       show the first message; sends nothing
  send-mailing.py DRAFT LIST --test EMAIL    send one [Test] copy to EMAIL
  send-mailing.py DRAFT LIST                 send to everyone (asks first)

DRAFT: "From:" and "Subject:" lines, a blank line, then the body. Blank lines
split paragraphs, a "---" line is a rule, [text](https://…) is a link, and
~unsubscribe_token is replaced with each subscriber's token.

LIST: the admin page's "Generate mailing list" output, `email, token` per line.

Sign-in comes from the Keychain. Set it up once (it prompts for the password):
  security add-generic-password -s machii-mailer -a YOUR_ICLOUD_LOGIN -w

Each send is recorded in DRAFT.sent.log. A rerun skips anyone already sent,
so after a stop (daily cap, network) just run the same command again.
"""

import argparse
import html
import re
import smtplib
import ssl
import subprocess
import sys
import time
import urllib.parse
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from email.utils import formatdate, make_msgid, parseaddr
from pathlib import Path

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
LINK_RE = re.compile(r"\[([^\]]+)\]\((https?://[^)\s]+)\)")


def fail(message):
    sys.exit(f"send-mailing: {message}")


def read_draft(path):
    head, sep, body = path.read_text(encoding="utf-8").partition("\n\n")
    if not sep:
        fail(f"{path}: put a blank line between the From/Subject lines and the body")
    headers = {}
    for line in head.splitlines():
        key, _, value = line.partition(":")
        headers[key.strip().lower()] = value.strip()
    sender, subject = headers.get("from", ""), headers.get("subject", "")
    if "@" not in parseaddr(sender)[1]:
        fail(f"{path}: needs a From: line with an address")
    if not subject:
        fail(f"{path}: needs a Subject: line")
    if PLACEHOLDER not in body:
        fail(f"{path}: the body has no {PLACEHOLDER} for the unsubscribe link")
    return sender, subject, body.strip()


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


def to_html(text):
    blocks = []
    for block in re.split(r"\n\s*\n", text):
        if block.strip() == "---":
            blocks.append("<hr>")
            continue
        escaped = LINK_RE.sub(r'<a href="\2">\1</a>', html.escape(block.strip(), quote=False))
        blocks.append("<p>" + escaped.replace("\n", "<br>\n") + "</p>")
    return (
        '<!doctype html><html><body style="font-family: -apple-system, Helvetica, '
        'sans-serif; font-size: 15px; line-height: 1.5;">\n'
        + "\n".join(blocks)
        + "\n</body></html>\n"
    )


def build_message(sender, subject, body, recipient, token):
    quoted = urllib.parse.quote(token)
    text = body.replace(PLACEHOLDER, quoted)
    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain=parseaddr(sender)[1].split("@")[1])
    msg["List-Unsubscribe"] = (
        f"<{ONE_CLICK_URL.format(token=quoted)}>, "
        f"<mailto:{parseaddr(sender)[1]}?subject=unsubscribe>"
    )
    msg["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click"
    msg.set_content(LINK_RE.sub(r"\1 (\2)", text) + "\n")
    msg.add_alternative(to_html(text), subtype="html")
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


def read_log(path):
    sent, recent = set(), 0
    if path.exists():
        since = datetime.now(timezone.utc) - timedelta(days=1)
        for line in path.read_text(encoding="utf-8").splitlines():
            stamp, email, status = (line.split("\t") + ["", ""])[:3]
            if status == "sent":
                sent.add(email)
                if datetime.fromisoformat(stamp) > since:
                    recent += 1
    return sent, recent


def send_one(smtp, msg):
    """Send, reconnecting once if iCloud dropped the connection. Returns the connection."""
    try:
        smtp.send_message(msg)
        return smtp
    except smtplib.SMTPServerDisconnected:
        smtp = connect()
        smtp.send_message(msg)
        return smtp


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("draft", type=Path)
    parser.add_argument("list", type=Path)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="show the first message; send nothing")
    mode.add_argument("--test", metavar="EMAIL", help="send one [Test] copy to EMAIL")
    args = parser.parse_args()

    sender, subject, body = read_draft(args.draft)
    subscribers = read_list(args.list)

    if args.dry_run:
        email, token = next(iter(subscribers.items()))
        msg = build_message(sender, subject, body, email, token)
        print(msg.as_string(policy=msg.policy.clone(max_line_length=200)))
        print(f"\n(dry run: {len(subscribers)} subscribers, nothing sent)")
        return

    if args.test:
        email = args.test.strip().lower()
        msg = build_message(sender, f"[Test] {subject}", body, email,
                            subscribers.get(email, TEST_TOKEN))
        send_one(connect(), msg).quit()
        print(f"Sent a test to {email}. Check it, then run without --test.")
        return

    log_path = args.draft.with_suffix(".sent.log")
    already, sent_today = read_log(log_path)
    pending = [(e, t) for e, t in subscribers.items() if e not in already]
    if not pending:
        print(f"Everyone on the list already has this mailing (see {log_path.name}).")
        return
    room = DAILY_CAP - sent_today
    if room <= 0:
        fail(f"{sent_today} sent in the last 24 hours; the cap is {DAILY_CAP}. Run again tomorrow.")

    batch = pending[:room]
    note = f" ({len(already)} already sent)" if already else ""
    later = f"; {len(pending) - len(batch)} wait for tomorrow's cap" if len(batch) < len(pending) else ""
    answer = input(f'Send "{subject}" to {len(batch)} subscribers{note}{later}? [y/N] ')
    if answer.strip().lower() != "y":
        print("Nothing sent.")
        return

    smtp = connect()
    sent = failed = in_a_row = 0
    with log_path.open("a", encoding="utf-8") as log:
        for number, (email, token) in enumerate(batch, 1):
            status = "sent"
            try:
                smtp = send_one(smtp, build_message(sender, subject, body, email, token))
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
                print(f"\nStopped: iCloud refused three in a row ({status}). Rerun later to resume.")
                break
            time.sleep(PAUSE_SECONDS)
    smtp.quit()
    print(f"\nDone. Log: {log_path}")


if __name__ == "__main__":
    main()
