/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ecosysteme-rdc/shared', '@ecosysteme-rdc/frako-sdk'],
  output: 'standalone',
};

module.exports = nextConfig;
