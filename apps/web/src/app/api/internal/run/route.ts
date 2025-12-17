import { NextResponse } from "next/server";
import { runPipeline } from "@/lib/runner/runPipeline";
import { assertCronSecret } from "@/lib/runner/cronAuth";

export async function POST(req: Request): Promise<Response> {
  try {
    assertCronSecret(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { dryRun?: boolean; category?: "AI_per_Marketing" | "AI_per_WebDev" | "AI_per_Aziende" }
    | null;

  const res = await runPipeline({
    dryRun: body?.dryRun ?? true,
    category: body?.category ?? "AI_per_WebDev",
  });

  return NextResponse.json(res);
}


