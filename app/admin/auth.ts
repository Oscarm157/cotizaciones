import { cookies } from "next/headers";

export const ADMIN_COOKIE = "brief_admin";

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === "ok";
}
