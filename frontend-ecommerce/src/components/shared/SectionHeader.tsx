"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  className,
  align = "center",
}: SectionHeaderProps) {
  const titleAlign =
    align === "center"
      ? "text-center mx-auto max-w-3xl text-balance-safe"
      : "text-left max-w-3xl text-balance-safe";
  const eyebrowAlign = align === "center" ? "text-center" : "text-left";
  const subAlign =
    align === "center"
      ? "text-center mx-auto max-w-2xl"
      : "text-left max-w-2xl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 md:mb-16 ${align === "left" ? "text-left" : "text-center"} ${className ?? ""}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand ${eyebrowAlign}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl font-normal tracking-[-0.02em] text-ink md:text-4xl lg:text-[2.35rem] ${titleAlign}`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 h-px w-12 bg-gradient-to-r from-brand to-indigo-400 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
      {subtitle ? (
        <p
          className={`mt-5 text-[15px] leading-relaxed text-ink-secondary md:text-base ${subAlign}`}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
