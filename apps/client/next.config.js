/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: "cdn.sanity.io",
      pathname: "**",
      protocol: "https"
    }]
  }
}

module.exports = nextConfig
