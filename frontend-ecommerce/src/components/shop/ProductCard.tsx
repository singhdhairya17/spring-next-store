"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { ProductSummary } from "@/types/catalog";
import { resolveAssetUrl } from "@/lib/url";

type ProductCardProps = {
  product: ProductSummary;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useAuth();
  const imageSrc = resolveAssetUrl(product.imageUrl);

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-elevate-sm transition-shadow duration-300 hover:border-line-strong hover:shadow-elevate"
    >
      <Link href={`/product/${product.id}`} className="block min-h-0 flex-1">
        <div className="relative aspect-[4/3] bg-surface-muted">
          {imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-ink-muted">
              No image
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full border border-line bg-surface/95 px-3 py-1 text-[13px] font-semibold tabular-nums text-ink shadow-elevate-sm backdrop-blur-sm">
            ${product.price.toFixed(2)}
          </div>
        </div>

        <div className="px-5 pb-2 pt-5">
          {product.category?.name ? (
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
              {product.category.name}
            </p>
          ) : null}
          <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-secondary">
            {product.description}
          </p>
        </div>
      </Link>

      <div className="px-5 pb-5 pt-1">
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => addToCart(product.id, product.price, 1)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-semibold text-white shadow-elevate-sm transition-colors duration-200 hover:bg-ink/90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <ShoppingCart size={17} strokeWidth={2} aria-hidden />
          Add to cart
        </motion.button>
      </div>
    </motion.article>
  );
}
