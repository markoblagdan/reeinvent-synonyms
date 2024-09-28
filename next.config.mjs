/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  outputFileTracingIncludes: {
    "app/_common/_repositories/synonyms-repository": ["./data/synonyms.csv"],
  },
};

export default nextConfig;
