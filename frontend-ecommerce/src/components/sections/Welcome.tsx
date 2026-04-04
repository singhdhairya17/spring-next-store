"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden rounded-3xl border border-line-strong/60 bg-ink text-white shadow-elevate-lg"
    >
      <div className="absolute inset-0 opacity-[0.35] mesh-noise" aria-hidden />
      <div
        className="absolute inset-0 bg-grid-subtle opacity-[0.2]"
        aria-hidden
      />
      <div
        className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-20 h-[380px] w-[380px] rounded-full bg-indigo-500/20 blur-[90px]"
        aria-hidden
      />

      <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-16 md:px-14 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-subtle" aria-hidden />
          Curated catalog
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.5 }}
          className="mt-7 max-w-3xl font-display text-[2.35rem] font-normal leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] text-balance-safe"
        >
          Thoughtful products. Frictionless checkout.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg"
        >
          A calm storefront experience — browse by category, inspect details,
          and move from cart to order without noise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <Link href="/allproducts" className="inline-flex">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink shadow-elevate transition-shadow duration-300 hover:shadow-elevate-lg"
            >
              Shop collection
              <ArrowRight
                className="h-[18px] w-[18px]"
                strokeWidth={2}
                aria-hidden
              />
            </motion.span>
          </Link>
          <Link
            href="/categories"
            className="rounded-full px-5 py-3 text-sm font-medium text-white/88 ring-1 ring-white/20 transition-colors hover:bg-white/10"
          >
            View categories
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
