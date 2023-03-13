/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {

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
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/track",
        destination: "/orders?error=no_direct_access_allowed",
        permanent: true,
        
      },
    ];
  },
};
module.exports = nextConfig;
// export default nextConfig;
