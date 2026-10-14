import type { NextConfig } from "next";

import "@/lib/env/server";
import "@/lib/env/client";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
