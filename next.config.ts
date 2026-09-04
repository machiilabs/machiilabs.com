import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
