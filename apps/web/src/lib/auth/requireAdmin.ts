import { cookies } from "next/headers";
import { sessionCookieName, verifySessionToken } from "@/lib/auth/session";

export async function requireAdminSession(): Promise<{ userId: string; email: string }> {
  const token = (await cookies()).get(sessionCookieName())?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  const payload = await verifySessionToken(token);
  return { userId: payload.sub, email: payload.email };
}


