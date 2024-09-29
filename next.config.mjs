/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    outputFileTracingIncludes: {
      "/": ["./data/*.csv"],
    },
  },
};

export default nextConfig;
