import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
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
