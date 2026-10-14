import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";
import { env } from "@/lib/env/server";

export const db = drizzle(postgres(env.DATABASE_URL), { schema });
