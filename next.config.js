/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      // imported by viem => noble-hashes
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
    return config;
  },
};

module.exports = nextConfig;
