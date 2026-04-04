import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getProductById } from "@/actions/user/product";
import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { resolveAssetUrl } from "@/lib/url";

interface CartItemProps {
  productId: string;
  quantity: number;
  updateCart: (
    updatedCart: { id: string; price: number; quantity: number }[],
  ) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productId,
  quantity,
  updateCart,
}) => {
  const [product, setProduct] = useState<{
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { itemsCount, setItemsCount } = useAuth();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        if (!data) {
          setError("Product not found");
          return;
        }
        setProduct(data);
      } catch {
        setError("Failed to load product");
      }
    }
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.map(
      (item: { id: string; price: number; quantity: number }) =>
        item.id === productId ? { ...item, quantity: itemQuantity } : item,
    );
    updateCart(updatedCart);
  }, [itemQuantity, productId, updateCart]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }
  if (!product) {
    return (
      <div className="animate-pulse rounded-2xl border border-line bg-surface p-6">
        <div className="flex gap-4">
          <div className="h-24 w-24 shrink-0 rounded-xl bg-surface-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 rounded bg-line-strong" />
            <div className="h-3 w-full rounded bg-line" />
          </div>
        </div>
      </div>
    );
  }

  const imageSrc = resolveAssetUrl(product.imageUrl);

  const handleIncreaseQuantity = () => {
    setItemsCount(itemsCount + 1);
    setItemQuantity((q) => q + 1);
  };

  const handleDecreaseQuantity = () => {
    if (itemQuantity > 1) {
      setItemsCount(itemsCount - 1);
      setItemQuantity((q) => q - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setItemsCount(itemsCount - itemQuantity + value);
      setItemQuantity(value);
    }
  };

  const handleDelete = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter(
      (item: { id: string }) => item.id !== productId,
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCart(updatedCart);
    setItemsCount(itemsCount - itemQuantity);
  };

  return (
    <motion.div
      layout
      className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-elevate-sm transition-shadow hover:shadow-elevate sm:flex-row sm:items-center sm:gap-6 sm:p-6"
    >
      <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-surface-muted sm:mx-0 sm:h-24 sm:w-24">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-muted">
            No image
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          {product.name}
        </h2>
        {product.description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-secondary">
            {product.description}
          </p>
        ) : null}
        <p className="font-display text-xl font-normal tabular-nums text-ink">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <div className="inline-flex items-center overflow-hidden rounded-xl border border-line bg-surface-muted">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-ink-secondary transition-colors hover:bg-line hover:text-ink"
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
            >
              −
            </motion.button>
            <input
              type="number"
              value={itemQuantity}
              onChange={handleQuantityChange}
              className="w-12 border-x border-line bg-transparent py-2 text-center text-sm font-medium text-ink focus:outline-none"
              min={1}
              aria-label="Quantity"
            />
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-ink-secondary transition-colors hover:bg-line hover:text-ink"
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
            >
              +
            </motion.button>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full p-2.5 text-red-600 transition-colors hover:bg-red-50"
            onClick={handleDelete}
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" strokeWidth={1.75} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
