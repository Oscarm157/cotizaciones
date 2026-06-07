import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "brief_admin";

// Token de sesion firmado con el password. No es adivinable sin el secreto.
export function adminToken(): string {
  const secret = process.env.BRIEF_ADMIN_PASSWORD || "";
  return createHmac("sha256", secret).update("brief-admin-v1").digest("hex");
}

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  const v = c.get(ADMIN_COOKIE)?.value;
  if (!v) return false;
  const expected = adminToken();
  if (v.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(v), Buffer.from(expected));
}
