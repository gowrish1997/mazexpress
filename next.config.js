/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mazexpress.portfolios.digital",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mazapi.portfolios.digital",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mazapi.easydesk.work",
        port: "",
        pathname: "/**",
      },

      
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/track",
        destination: "/:locale/orders",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
// export default nextConfig;
