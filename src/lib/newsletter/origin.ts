/**
 * The origin the reader used: machiilabs.com in production, localhost in dev.
 * `request.url` can't be used, because the dev server reports its bind
 * address (0.0.0.0) there.
 */
export function requestOrigin(request: Request): string {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  return `${proto}://${host}`;
}
