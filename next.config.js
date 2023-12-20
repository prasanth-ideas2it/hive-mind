/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  env: {
    HIVE_MIND_BASE_URL: process.env.HIVE_MIND_BASE_URL,
  },
};

module.exports = nextConfig;
