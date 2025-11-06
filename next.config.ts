import type { NextConfig } from "next";
import { baseURL } from "./baseUrl";

const nextConfig: NextConfig = {
  assetPrefix: baseURL,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
