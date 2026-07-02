"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * motion/react's useReducedMotion() lee un useState fijado en el render de
 * servidor (sin window) y nunca se reevalua en cliente. Mismo patron manual
 * que ya usa bustamante/live-chat.tsx.
 */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduce;
}

const VARIANTS: Record<string, Variants> = {
  "fade-up": { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  "slide-left": { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
  "slide-right": { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } },
  "line-in": {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  },
};

type VariantName = keyof typeof VARIANTS;

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.25,
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: VariantName;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "span";
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    const Plain = Tag;
    return (
      <Plain className={className} data-reveal="">
        {children}
      </Plain>
    );
  }

  const MotionTag = Tag === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  once?: boolean;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} data-reveal="">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "fade-up",
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  variant?: VariantName;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} data-reveal="">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal=""
      variants={VARIANTS[variant]}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
