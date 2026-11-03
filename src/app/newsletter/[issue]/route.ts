import { requestOrigin } from "@/lib/newsletter/origin";
import { issuePayload } from "@/lib/newsletter/serve";

// The web copy of an issue. Unlisted: noindex, not in the sitemap or nav, and
// deliberately not in robots.ts, which would publish the path.
// Rendered per request: links and images use the origin the reader came from.
export const dynamic = "force-dynamic";

export async function GET(request: Request, ctx: RouteContext<"/newsletter/[issue]">) {
  const { issue } = await ctx.params;
  const body = issuePayload(issue, "web", requestOrigin(request));
  if (body === null) return new Response("Not found", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
