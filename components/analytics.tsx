"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { env } from "@/lib/env/client";
import { z } from "@/lib/zod";

const eventNameSchema = z
  .string()
  .min(1)
  .max(40)
  .regex(/^[a-z0-9_]+$/)
  .refine((name) => !/^(ga_|google_|firebase_)/.test(name));

type TrackOptions = Record<string, string | number | boolean | null | undefined>;

function Google() {
  const gaId = env.NEXT_PUBLIC_GAID;

  if (!gaId) return null;

  return <GoogleAnalytics gaId={gaId} />;
}

function track(event: string, options: TrackOptions = {}) {
  if (!env.NEXT_PUBLIC_GAID) return;

  const parsedEvent = eventNameSchema.safeParse(event);

  if (!parsedEvent.success) {
    console.error("[track] Invalid event name:", parsedEvent.error.issues);
    return;
  }

  sendGAEvent("event", parsedEvent.data, options);
}

export { Google, track };
