"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/inmobiliaria/inicio.png", label: "Inicio" },
  { src: "/inmobiliaria/portal.png", label: "Portal de propiedades" },
  { src: "/inmobiliaria/detalle.png", label: "Detalle de propiedad" },
  { src: "/inmobiliaria/contacto.png", label: "Contacto" },
];

const INTERVAL_MS = 3000;

export function Slideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div>
      <div
        className="screen-only relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-card-border bg-primary/95"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-contain"
            />
          </div>
        ))}

        <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.22em] font-semibold bg-primary/90 text-white px-3 py-1.5 rounded">
          {SLIDES[index].label}
        </div>

        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ver ${s.label}`}
            />
          ))}
        </div>
      </div>

      <div className="print-only grid grid-cols-2 gap-3 mt-2">
        {SLIDES.map((slide) => (
          <figure
            key={slide.src}
            className="rounded-lg overflow-hidden border border-card-border bg-card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.label} className="w-full h-auto object-contain" />
            <figcaption className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted px-3 py-1.5 border-t border-card-border">
              {slide.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
