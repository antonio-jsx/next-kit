import type { NextRequest } from "next/server";
import { env } from "@/lib/env/server";

import "server-only";

const parsedRoot = (() => {
  const raw = env.APP_URL || "localhost:3000";
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return new URL("https://localhost:3000");
  }
})();

export const rootHostname = parsedRoot.hostname;
export const rootHost = parsedRoot.host;

export function extractSubdomain(request: NextRequest): string | null {
  const hostname = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (hostname.endsWith(".localhost")) {
    return hostname.slice(0, -".localhost".length);
  }
  if (hostname === "localhost") return null;

  if (hostname.endsWith(".vercel.app") && hostname.includes("---")) {
    return hostname.split("---")[0];
  }

  if (hostname.endsWith(`.${rootHostname}`)) {
    return hostname.slice(0, hostname.length - rootHostname.length - 1);
  }

  return null;
}
