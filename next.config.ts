import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [{
      hostname : "**"
    }],
    unoptimized : true
  }
};

export default nextConfig;