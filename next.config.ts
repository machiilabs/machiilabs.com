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
      {
        source: "/skagway/explore",
        destination: "/skagway",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
