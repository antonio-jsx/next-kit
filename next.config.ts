import type { NextConfig } from "next";

import "@/lib/env/server";
import "@/lib/env/client";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
