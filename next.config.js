/** @type {import('next').NextConfig} */
const nextConfig = {
  // useFileSystemPublicRoutes: false,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mazexpress.portfolios.digital",
        port: "",
        pathname: "/_next/**",
      },
      
    ],
  },
};

module.exports = nextConfig;
