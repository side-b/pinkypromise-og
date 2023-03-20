/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/:id", destination: "/api/og?promise=:id" }];
  },
};

module.exports = nextConfig;
