/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  webpack(config, options) {
    // console.log(config.plugins)
    // console.log(path.join(cwd(), "styles"));
    // Fixes npm packages that depend on `fs` module
    // config.module.rules.push({
    //   test: /\.css$/i,
    //   include: [path.join(cwd(), "styles/")],
    //   use: [
    //     "style-loader",
    //     "css-loader",
    //     {
    //       loader: "postcss-loader",
    //       options: {
    //         postcssOptions: {
    //           plugins: ["postcss-preset-env", "postcss-import", "tailwindcss"],
    //         },
    //       },
    //     },
    //   ],
    // });

    // config.module.rules.push({
    //   test: /\.ttf$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: "postcss-loader",
    //     },
    //   ],
    // });

    // config.module.rules.push({
    //   test: /\.notifications.css$/,
    //   use: [options.defaultLoaders.babel],
    // });

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // config.devServer = {
    //   static: "dist",
    //   watchContentBase: true,
    // };

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
