"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CategorySummary } from "@/types/catalog";
import { resolveAssetUrl } from "@/lib/url";
import { ChevronRight } from "lucide-react";

type CategoryCardProps = {
  category: CategorySummary;
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageSrc = resolveAssetUrl(category.image_url);

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`/categories/${category.id}`}
        className="group block h-[280px]"
      >
        <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface-muted shadow-elevate-sm transition-all duration-300 hover:border-line-strong hover:shadow-elevate">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-line to-surface-muted text-sm font-medium text-ink-muted">
              No image
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

          <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
            <h2 className="mb-1.5 font-display text-2xl font-normal tracking-tight text-white">
              {category.name}
            </h2>
            {category.description ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-white/75">
                {category.description}
              </p>
            ) : null}
          </div>

          <div className="absolute right-4 top-4 z-10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/20">
              <ChevronRight
                className="h-5 w-5"
                strokeWidth={1.75}
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
