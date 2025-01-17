/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
      reactStrictMode: true,
      experimental: {
        appDir: true, // Ensure app directory routing is enabled
      },
};

export default nextConfig;
