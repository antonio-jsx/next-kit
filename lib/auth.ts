import { i18n, locales } from "@better-auth/i18n";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { env } from "@/env/server";
import { db } from "@/lib/db";

const trustedOrigins = [env.CORS_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"].filter(
  Boolean,
) as string[];

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),
  advanced: {
    database: { joins: true },
    useSecureCookies: env.NODE_ENV === "production",
    ipAddress: {
      trustedProxies: ["127.0.0.1", "::1"],
    },
  },
  trustedOrigins,
  baseURL: {
    allowedHosts: [env.BETTER_AUTH_URL],
    protocol: env.NODE_ENV === "development" ? "http" : "https",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: "memory",
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 60, max: 5 },
      "/reset-password": { window: 60, max: 3 },
      "/verify-email": { window: 60, max: 10 },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
  },
  plugins: [
    i18n({
      translations: {
        es: locales.es,
      },
      defaultLocale: "es",
    }),
  ],
});
