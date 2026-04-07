"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryCard from "@/components/shop/CategoryCard";
import { fetchCategories } from "@/actions/category";
import type { CategorySummary } from "@/types/catalog";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LayoutGrid } from "lucide-react";

function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-[280px] animate-pulse rounded-2xl border border-line bg-surface-muted"
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function CategorySection() {
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      const data = await fetchCategories();
      if (!cancelled) {
        setCategories(Array.isArray(data) ? data : []);
        setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Browse"
        title="Shop by category"
        subtitle="Choose a department to see everything we stock in that space."
      />

      {isLoading ? (
        <CategoryGridSkeleton />
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface py-16 px-6 text-center shadow-elevate-sm">
          <LayoutGrid className="mb-3 h-11 w-11 text-ink-muted" aria-hidden />
          <p className="font-medium text-ink">No categories to show</p>
          <p className="mt-1 text-sm text-ink-secondary">
            Add categories in the admin panel to see them here.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
