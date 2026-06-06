"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "./auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (password && password === process.env.BRIEF_ADMIN_PASSWORD) {
    const c = await cookies();
    c.set(ADMIN_COOKIE, "ok", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export async function logout() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
