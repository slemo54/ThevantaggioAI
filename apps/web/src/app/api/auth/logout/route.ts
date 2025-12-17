import { NextResponse } from "next/server";
import { sessionCookieName } from "@/lib/auth/session";

export async function POST(): Promise<Response> {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName(), "", { path: "/", maxAge: 0 });
  return res;
}


