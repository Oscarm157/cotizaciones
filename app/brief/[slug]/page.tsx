import { notFound } from "next/navigation";
import { getClient } from "@/lib/brief/clients";
import { visibleSchema } from "@/lib/brief/visibility";
import BriefForm from "./brief-form";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { slug } = await params;
  const { id } = await searchParams;
  const client = await getClient(slug);
  if (!client) notFound();

  const sections = visibleSchema(client);
  return <BriefForm entry={client} sections={sections} resumeId={id ?? null} />;
}
