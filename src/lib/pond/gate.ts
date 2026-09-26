import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const POND_COOKIE = "pond_gate";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

export function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(digest(a), digest(b));
}

export function gateToken(secret: string): string {
  return createHmac("sha256", secret).update("machii-pond-gate-v1").digest("base64url");
}

export function pondCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}

export async function isPondUnlocked(): Promise<boolean> {
  const secret = process.env.POND_PASSPHRASE;
  if (!secret) return false;
  const jar = await cookies();
  const value = jar.get(POND_COOKIE)?.value;
  if (!value) return false;
  const expected = gateToken(secret);
  const left = Buffer.from(value);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
