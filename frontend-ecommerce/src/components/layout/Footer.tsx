"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { STORE_NAME } from "@/lib/brand";

const footerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const footerLinkClass =
  "text-zinc-400 transition-colors duration-200 hover:text-white text-sm";

export default function Footer() {
  return (
    <motion.footer
      className="relative mt-auto border-t border-white/[0.08] bg-ink text-white"
      initial="hidden"
      whileInView="visible"
      variants={footerVariants}
      viewport={{ once: true }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="font-display text-xl tracking-tight text-white">
              {STORE_NAME}
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Full-stack demo storefront — Spring Boot API and Next.js UI. Built
              by Dhairya Singh.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/allproducts", label: "All products" },
                { href: "/categories", label: "Categories" },
                { href: "/cart", label: "Cart" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-brand"
                  aria-hidden
                />
                <span>123 Market Street, City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-brand" aria-hidden />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-brand" aria-hidden />
                <span>hello@example.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Social
            </h3>
            <div className="flex gap-2">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-14 border-t border-white/[0.08] pt-8 text-center text-xs text-zinc-500"
        >
          <p>
            &copy; {new Date().getFullYear()} Dhairya Singh. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
