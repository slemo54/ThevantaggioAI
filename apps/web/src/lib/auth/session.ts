import { SignJWT, jwtVerify } from "jose";
import { requireEnv } from "@/lib/env";

type SessionPayload = {
  sub: string;
  email: string;
};

const COOKIE_NAME = "ilvantaggioai_session";

function getSecretKey(): Uint8Array {
  const secret = requireEnv("AUTH_JWT_SECRET");
  return new TextEncoder().encode(secret);
}

export function sessionCookieName(): string {
  return COOKIE_NAME;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + 60 * 60 * 24 * 7) // 7 giorni
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, getSecretKey());
  if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
    throw new Error("Invalid session payload");
  }
  return { sub: payload.sub, email: payload.email };
}


