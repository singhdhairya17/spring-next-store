"use client";

import { fetchCategories } from "@/actions/category";
import CategoryCard from "@/components/shop/CategoryCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { CategorySummary } from "@/types/catalog";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategorySummary[]>([]);

  useEffect(() => {
    async function load() {
      const data = await fetchCategories();
      setCategories(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="relative border-b border-line bg-surface/40">
        <div
          className="absolute inset-0 bg-grid-subtle opacity-[0.35]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHeader
            align="left"
            eyebrow="Browse"
            title="Categories"
            subtitle="Pick a department to see products grouped the way we organize the catalog."
            className="!mb-0"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
