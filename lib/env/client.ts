import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "@/lib/zod";

export const env = createEnv({
  client: { NEXT_PUBLIC_GAID: z.string().optional() },
  runtimeEnv: {
    NEXT_PUBLIC_GAID: process.env.NEXT_PUBLIC_GAID,
  },
});
