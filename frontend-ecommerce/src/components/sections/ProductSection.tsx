"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { getProducts } from "@/actions/user/product";
import type { ProductSummary } from "@/types/catalog";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PackageOpen } from "lucide-react";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-line bg-surface animate-pulse"
        >
          <div className="aspect-[4/3] bg-surface-muted" />
          <div className="space-y-3 p-5">
            <div className="h-3.5 w-1/3 rounded bg-line-strong" />
            <div className="h-5 w-4/5 rounded bg-line-strong" />
            <div className="h-3 w-full rounded bg-line" />
            <div className="mt-4 h-10 rounded-xl bg-line-strong" />
          </div>
        </div>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export default function ProductSection() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      const data = await getProducts();
      if (!cancelled) {
        setProducts(Array.isArray(data) ? data : []);
        setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Catalog"
          title="Featured products"
          subtitle="Highlights from the catalog — open a product for full detail or add to cart in one step."
        />

        {isLoading ? (
          <ProductGridSkeleton />
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface py-20 px-6 text-center shadow-elevate-sm">
            <PackageOpen
              className="mb-4 h-12 w-12 text-ink-muted"
              aria-hidden
            />
            <p className="font-medium text-ink">No products yet</p>
            <p className="mt-1 max-w-md text-sm text-ink-secondary">
              When the catalog is populated, products will show up here
              automatically.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
