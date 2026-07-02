import { type Lang } from "../content";
import { Deck } from "./deck";

type SP = Promise<{ lang?: string }>;

export default async function PresentacionPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const lang: Lang = sp?.lang === "en" ? "en" : "es";

  return <Deck lang={lang} />;
}
