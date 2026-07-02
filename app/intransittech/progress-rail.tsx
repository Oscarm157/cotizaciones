"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ProgressRail({
  phases,
  containerRef,
}: {
  phases: readonly { num: string; name: string }[];
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-phase]")
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const phase = Number(entry.target.getAttribute("data-phase"));
            setActive(phase - 1);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="no-print hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-30">
      <div className="relative flex flex-col justify-between h-48 pl-4">
        {/* Línea de fondo + relleno de progreso */}
        <div className="absolute left-0 top-0 w-px h-full bg-card-border/60 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-accent rounded-full"
            style={{ height: fillHeight }}
          />
        </div>

        {phases.map((p, i) => (
          <div key={p.num} className="relative flex items-center gap-2">
            <div
              className={`absolute left-0 -translate-x-1/2 w-2 h-2 rounded-full transition-colors duration-300 ${
                i === active ? "bg-accent scale-125" : "bg-card-border"
              }`}
            />
            <span
              className={`text-[9px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap transition-colors duration-300 ${
                i === active ? "text-accent" : "text-muted/50"
              }`}
            >
              {p.num}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
