import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    globalNotFound: true,
  },
  output: 'standalone',
};

export default withPayload(nextConfig);
