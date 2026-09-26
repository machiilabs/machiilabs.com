import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        source: "/privacy2",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
