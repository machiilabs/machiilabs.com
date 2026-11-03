import { requestOrigin } from "@/lib/newsletter/origin";
import { issuePayload, issueSubject } from "@/lib/newsletter/serve";

// The HTML part of an issue's email, fetched by scripts/send-mailing.py.
// Rendered per request: links and images use the origin the reader came from.
export const dynamic = "force-dynamic";

export async function GET(request: Request, ctx: RouteContext<"/newsletter/[issue]/email">) {
  const { issue } = await ctx.params;
  const body = issuePayload(issue, "email", requestOrigin(request));
  if (body === null) return new Response("Not found", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Newsletter-Subject": encodeURIComponent(issueSubject(issue) ?? ""),
    },
  });
}
