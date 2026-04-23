"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/**
 * On first visit (no ?lang param), if the browser language starts with "en",
 * redirect to ?lang=en. Otherwise stay on the default Spanish render.
 */
export function BrowserLangDetector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("lang")) return;
    const browserLang = (navigator.language || "").toLowerCase();
    if (browserLang.startsWith("en")) {
      router.replace(`${pathname}?lang=en`);
    }
  }, [router, pathname, searchParams]);

  return null;
}
