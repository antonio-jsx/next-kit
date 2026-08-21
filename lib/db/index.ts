import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env/server";
import * as schema from "@/lib/db/schema";

export const db = drizzle(postgres(env.DATABASE_URL), { schema });
