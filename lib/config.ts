import { env } from "@/lib/env/server";

export const APP_NAME = "Next-Kit";
export const URL_LOCALE = "http://localhost:3000";

export function getAppUrl() {
  const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL;
  return (env.APP_URL || (vercelUrl ? `https://${vercelUrl}` : URL_LOCALE)).replace(/\/$/, "");
}
