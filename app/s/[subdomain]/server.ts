import "server-only";

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";

export async function getSubdomainUser(slug: string) {
  const user = await db.query.users.findFirst({ where: eq(users.name, slug) });

  if (!user) notFound();

  return user;
}
