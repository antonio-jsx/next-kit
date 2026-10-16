import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env/server";

dotenv.config();

export default defineConfig({
  out: "./lib/db/migrations",
  schema: "./lib/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
