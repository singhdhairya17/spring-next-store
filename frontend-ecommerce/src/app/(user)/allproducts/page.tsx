"use client";

import { motion } from "framer-motion";
import ErrorComponent from "@/components/feedback/ErrorComponent";
import Loader from "@/components/feedback/Loader";
import ProductCard from "@/components/shop/ProductCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useEffect, useState } from "react";
import { getProducts } from "@/actions/user/product";
import type { ProductSummary } from "@/types/catalog";

export default function Page() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getProducts();
        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 14, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorComponent />;
  }

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
            eyebrow="Catalog"
            title="Every product in one place"
            subtitle="Browse the full assortment — same cards and checkout flow as the home page."
            className="!mb-0 !text-left"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
