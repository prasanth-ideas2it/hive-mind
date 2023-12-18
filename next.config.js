/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/proposals",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
