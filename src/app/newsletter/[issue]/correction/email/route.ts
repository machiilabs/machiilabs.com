import { requestOrigin } from "@/lib/newsletter/origin";
import { correctionPayload, correctionSubject } from "@/lib/newsletter/serve";

// The HTML part of a correction's email, fetched by scripts/send-mailing.py.
// Rendered per request: links and images use the origin the reader came from.
export const dynamic = "force-dynamic";

export async function GET(request: Request, ctx: RouteContext<"/newsletter/[issue]/correction/email">) {
  const { issue } = await ctx.params;
  const body = correctionPayload(issue, "email", requestOrigin(request));
  if (body === null) return new Response("Not found", { status: 404 });

  return new Response(body, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Newsletter-Subject": encodeURIComponent(correctionSubject(issue) ?? ""),
    },
  });
}
