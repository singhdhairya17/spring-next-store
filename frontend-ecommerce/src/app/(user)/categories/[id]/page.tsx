"use client";

import { useEffect, useState, use } from "react";
import ProductCard from "@/components/shop/ProductCard";
import Loader from "@/components/feedback/Loader";
import ErrorComponent from "@/components/feedback/ErrorComponent";
import { getBackendBaseUrl } from "@/lib/url";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ProductSummary } from "@/types/catalog";

export default function CategoryProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = use(params);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    let cancelled = false;
    (async () => {
      try {
        const base = getBackendBaseUrl();
        const response = await fetch(
          `${base}/api/categories/${categoryId}/products`,
          {
            cache: "no-store",
          },
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        if (cancelled) return;
        setProducts(Array.isArray(data) ? data : []);
        if (Array.isArray(data) && data.length > 0 && data[0]?.category?.name) {
          setCategoryName(data[0].category.name);
        } else {
          setCategoryName("Category");
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/categories"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          All categories
        </Link>

        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            Category
          </p>
          <h1 className="mt-2 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
            {categoryName}
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-surface py-20 text-center text-ink-secondary shadow-elevate-sm">
            No products in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
