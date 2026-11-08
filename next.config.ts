import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phone and iPad on the same Wi-Fi load the dev server by LAN IP.
  // Next blocks /_next from any host other than localhost unless listed here.
  allowedDevOrigins: ["*.local", "192.168.*.*", "10.*.*.*", "172.*.*.*"],
  async headers() {
    const hidden = [
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "Cache-Control", value: "private, no-store" },
    ];
    return [
      { source: "/pond", headers: hidden },
      { source: "/pond/:path*", headers: hidden },
    ];
  },
  async redirects() {
    return [
      // lisztmail.com and lisztmail.app (and www.) are the app's own domains; until the app has a site of its own,
      // every visit lands on its page here. Temporary (307) so browsers don't cache it past that.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?:www\\.)?lisztmail\\.(?:com|app)" }],
        destination: "https://machiilabs.com/lisztmail",
        permanent: false,
      },
      {
        source: "/skagway/explore",
        destination: "/skagway",
        permanent: true,
      },
      {
        source: "/privacy2",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/about#contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
