import { NextResponse } from "next/server";
import { assertCronSecret } from "@/lib/runner/cronAuth";
import { runPipeline } from "@/lib/runner/runPipeline";

export async function POST(req: Request): Promise<Response> {
  try {
    assertCronSecret(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cron: esegui pipeline reale (dryRun=false) per categoria di default,
  // modificabile in futuro via scheduling multiplo o query params.
  const res = await runPipeline({ dryRun: false, category: "AI_per_WebDev" });
  return NextResponse.json(res);
}


