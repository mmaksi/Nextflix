/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,
  // images: {
  //   domains: ["images.unsplash.com", "i.ytimg.com", "yt3.ggpht.com"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
