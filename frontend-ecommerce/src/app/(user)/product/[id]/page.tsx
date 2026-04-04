"use client";

import { useState, useEffect, use } from "react";
import { Button, Input } from "@heroui/react";
import Notification from "@/components/feedback/Notification";
import { motion } from "framer-motion";
import Image from "next/image";
import { getProductById } from "@/actions/user/product";
import { useAuth } from "@/context/AuthContext";
import { resolveAssetUrl } from "@/lib/url";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Params {
  id: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imageUrl: string;
  active: boolean;
  category: {
    id: string;
    name: string;
  };
}

export default function ProductPage({
  params: initialParams,
}: {
  params: Promise<Params>;
}) {
  const unwrappedParams = use(initialParams);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { addToCart } = useAuth();

  useEffect(() => {
    async function loadProduct() {
      if (!unwrappedParams?.id) return;
      const data = await getProductById(unwrappedParams.id);
      setProduct(data);
    }
    loadProduct();
  }, [unwrappedParams?.id]);

  const imageSrc = product ? resolveAssetUrl(product.imageUrl) : "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-canvas"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link
          href="/allproducts"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Back to catalog
        </Link>

        {product ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-surface-muted shadow-elevate lg:aspect-[4/5]"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center text-sm font-medium text-ink-muted">
                  No image
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="flex flex-col justify-center"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                {product.category?.name ?? "Product"}
              </p>
              <h1 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl text-balance-safe">
                {product.name}
              </h1>
              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-3xl tabular-nums tracking-tight text-ink">
                  ${product.price.toFixed(2)}
                </span>
                {product.quantity < 10 && product.quantity > 0 ? (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200/80">
                    Only {product.quantity} left
                  </span>
                ) : null}
              </div>
              <p className="mt-6 text-base leading-relaxed text-ink-secondary">
                {product.description}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
                <Input
                  type="number"
                  name="quantity"
                  label="Quantity"
                  value={quantity.toString()}
                  min={1}
                  max={product.quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="max-w-[140px]"
                  variant="bordered"
                  radius="lg"
                  classNames={{
                    inputWrapper: "border-line bg-surface shadow-elevate-sm",
                    label: "text-ink-secondary",
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="sm:flex-1"
                >
                  <Button
                    className="h-12 w-full rounded-xl bg-ink text-[15px] font-semibold text-white sm:max-w-xs"
                    onPress={() => {
                      addToCart(product.id, product.price, quantity);
                      setNotification({
                        message: "Added to cart",
                        type: "success",
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                </motion.div>
              </div>

              <div className="mt-10 border-t border-line pt-8 text-sm text-ink-secondary">
                <span className="font-medium text-ink">Category: </span>
                <Link
                  href={`/categories/${product.category.id}`}
                  className="font-medium text-brand hover:text-brand-hover"
                >
                  {product.category.name}
                </Link>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="py-24 text-center text-ink-secondary">
            Loading product…
          </div>
        )}
      </div>

      {notification ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
        >
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        </motion.div>
      ) : null}
    </motion.div>
  );
}
