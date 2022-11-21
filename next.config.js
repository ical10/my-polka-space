/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    apiAuthHeader: process.env.NEXT_AUTH_HEADER,
  },
};

module.exports = nextConfig;
