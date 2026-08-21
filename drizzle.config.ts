import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "@/env/server";

dotenv.config();

export default defineConfig({
  out: "./.drizzle",
  schema: "./lib/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
