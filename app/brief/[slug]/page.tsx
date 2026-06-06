import { notFound } from "next/navigation";
import { getQuote } from "@/lib/brief/registry";
import { visibleSchema } from "@/lib/brief/visibility";
import BriefForm from "./brief-form";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { slug } = await params;
  const { id } = await searchParams;
  const quote = getQuote(slug);
  if (!quote) notFound();

  const sections = visibleSchema(slug);
  return <BriefForm entry={quote} sections={sections} resumeId={id ?? null} />;
}
