/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack, dev }) => {
    // "node:crypto": is imported by viem => noble-hashes
    if (dev) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
          const mod = resource.request.replace(/^node:/, "");
          switch (mod) {
            case "crypto":
              resource.request = "buffer";
              break;
            default:
              throw new Error(`Not found ${mod}`);
          }
        }),
      );
    } else {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\@noble\/hashes\/crypto$/,
        }),
        new webpack.IgnorePlugin({ resourceRegExp: /^crypto$/ }),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
