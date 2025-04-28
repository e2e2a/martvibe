/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@prisma/client': path.resolve(__dirname, './node_modules/@prisma/client'),
    };
    return config;
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //     };
  //   }
  //   return config;
  // },
  // turbopack: {
  //   // ...
  // },
};

export default nextConfig;
