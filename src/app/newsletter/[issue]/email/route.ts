import { requestOrigin } from "@/lib/newsletter/origin";
import { findIssue } from "@/lib/newsletter/issues";
import { renderNewsletterHtml } from "@/lib/newsletter/render";

// The HTML part of the email, fetched by scripts/send-mailing.py.
// Rendered per request: links and images use the origin the reader came from.
export const dynamic = "force-dynamic";

export async function GET(request: Request, ctx: RouteContext<"/newsletter/[issue]/email">) {
  const issue = findIssue((await ctx.params).issue);
  if (!issue) return new Response("Not found", { status: 404 });

  const html = renderNewsletterHtml(issue, { mode: "email", origin: requestOrigin(request) });
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Newsletter-Subject": encodeURIComponent(issue.subject),
    },
  });
}
