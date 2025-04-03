/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.futurebridge.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-strapi.futurebridge.com', // Add the Strapi domain
        port: '',
        pathname: '/**',
      },
      // Add other allowed domains here if needed
    ],
  },
  // Add development indicator configuration to allow specific origins
  devIndicators: {
    allowedDevOrigins: [
      // Add the IP address from the warning
      '192.168.10.58',
      // Add other development origins if needed (e.g., codespaces URL)
    ],
  },
};

export default nextConfig;
