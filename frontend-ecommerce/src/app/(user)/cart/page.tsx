"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CartItem from "@/components/shop/CartItem";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<
    { id: string; price: number; quantity: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, itemsCount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    setTotalPrice(total);
  }, [cart]);

  const updateCart = useCallback(
    (updatedCart: { id: string; price: number; quantity: number }[]) => {
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    [],
  );

  const handleValidateOrder = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    if (itemsCount === 0) {
      router.push("/");
    } else {
      router.push("/order/validate");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-canvas"
    >
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 text-center lg:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            Cart
          </p>
          <h1 className="mt-2 font-display text-3xl font-normal tracking-tight text-ink md:text-4xl">
            Your bag
          </h1>
          <p className="mt-2 text-sm text-ink-secondary">
            Review items before checkout.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="py-20 text-center text-sm text-ink-secondary">
              Loading…
            </div>
          ) : cart.length > 0 ? (
            <motion.div className="space-y-4" initial={false}>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
                >
                  <CartItem
                    productId={item.id}
                    quantity={item.quantity}
                    updateCart={updateCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-surface py-20 px-6 text-center shadow-elevate-sm"
            >
              <ShoppingBag
                className="mb-4 h-12 w-12 text-ink-muted"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="font-medium text-ink">Your cart is empty</p>
              <p className="mt-1 max-w-sm text-sm text-ink-secondary">
                Discover products on the home page or browse the full catalog.
              </p>
              <Link
                href="/allproducts"
                className="mt-8 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
              >
                Browse products
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {cart.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 rounded-3xl border border-line bg-surface p-6 shadow-elevate sm:p-8"
          >
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-6">
              <span className="text-sm font-medium text-ink-secondary">
                Estimated total
              </span>
              <span className="font-display text-3xl font-normal tabular-nums tracking-tight text-ink">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              className="h-12 w-full rounded-xl bg-brand text-[15px] font-semibold text-white shadow-elevate-sm hover:bg-brand-hover"
              onPress={handleValidateOrder}
            >
              Proceed to checkout
            </Button>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default CartPage;
