import type { NextConfig } from "next";

import "@/env/server";
import "@/env/client";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
