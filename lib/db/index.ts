import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env/server";

export const db = drizzle(postgres(env.DATABASE_URL));
