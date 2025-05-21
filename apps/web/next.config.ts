import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "cdn.simpleicons.org",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
