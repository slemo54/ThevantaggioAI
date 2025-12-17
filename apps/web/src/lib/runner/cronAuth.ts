import crypto from "node:crypto";
import { requireEnv } from "@/lib/env";

export function assertCronSecret(req: Request): void {
  const expected = requireEnv("CRON_SECRET");
  const provided = req.headers.get("x-cron-secret") ?? "";

  // constant-time compare (best effort)
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) {
    throw new Error("Unauthorized");
  }
}


