import { requestOrigin } from "@/lib/newsletter/origin";
import { findIssue } from "@/lib/newsletter/issues";
import { renderNewsletterText } from "@/lib/newsletter/render";

// The plain-text part of the email, fetched by scripts/send-mailing.py.
// Rendered per request: links and images use the origin the reader came from.
export const dynamic = "force-dynamic";

export async function GET(request: Request, ctx: RouteContext<"/newsletter/[issue]/email/text">) {
  const issue = findIssue((await ctx.params).issue);
  if (!issue) return new Response("Not found", { status: 404 });

  const text = renderNewsletterText(issue, { origin: requestOrigin(request) });
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
