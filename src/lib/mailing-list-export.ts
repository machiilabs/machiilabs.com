/**
 * One paste line per subscriber for scripts/send-mailing.py.
 * The site does not send mail. Each line is `email, unsubscribe_token`.
 */

export type MailingListRow = {
  email: string;
  unsubscribe_token: string;
};

const LINE_RE =
  /^[^\s,@]+@[^\s,@]+\.[^\s,@]+, [0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function formatMailingList(rows: readonly MailingListRow[]): string {
  const lines: string[] = [];

  const ordered = [...rows].sort((a, b) =>
    a.email.localeCompare(b.email, "en"),
  );

  for (const row of ordered) {
    if (typeof row.email !== "string" || typeof row.unsubscribe_token !== "string") {
      continue;
    }
    const email = row.email.trim().toLowerCase();
    const token = row.unsubscribe_token.trim().toLowerCase();
    const line = `${email}, ${token}`;
    if (LINE_RE.test(line)) lines.push(line);
  }

  return lines.join("\n");
}
