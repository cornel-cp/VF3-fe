import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      // Add other image sources if needed
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com',
      'ui-avatars.com'
    ],
  },
  reactStrictMode: true,
  // Your other config options.
};

export default nextConfig;
