"use server";

import { redirect } from "next/navigation";
import { isAdmin } from "../auth";
import { SECTION_CATALOG, defaultSections } from "@/lib/brief/schema";
import { getClient, createClient, updateClient, deleteClient } from "@/lib/brief/clients";

function sectionsFromForm(formData: FormData): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const s of SECTION_CATALOG) map[s.id] = formData.get(`s_${s.id}`) === "on";
  return map;
}

export async function createClientAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const title = String(formData.get("title") || "").trim();
  const folio = String(formData.get("folio") || "").trim();

  if (!slug || !title || !/^[a-z0-9-]+$/.test(slug)) {
    redirect("/admin/clientes?error=datos");
  }
  if (await getClient(slug)) {
    redirect("/admin/clientes?error=existe");
  }

  await createClient({ slug, title, folio, sections: defaultSections() });
  redirect(`/admin/clientes/${slug}`);
}

export async function updateClientAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const slug = String(formData.get("slug") || "");
  const title = String(formData.get("title") || "").trim();
  const folio = String(formData.get("folio") || "").trim();

  await updateClient(slug, { title, folio, sections: sectionsFromForm(formData) });
  redirect(`/admin/clientes/${slug}?ok=1`);
}

export async function deleteClientAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const slug = String(formData.get("slug") || "");
  await deleteClient(slug);
  redirect("/admin/clientes");
}
