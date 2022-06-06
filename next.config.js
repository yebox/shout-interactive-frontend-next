/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com", "static.toiimg.com", "hips.hearstapps.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
