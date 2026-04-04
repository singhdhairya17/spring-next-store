"use client";

import ProductSection from "@/components/sections/ProductSection";
import WelcomeBanner from "@/components/sections/Welcome";
import Footer from "@/components/layout/Footer";
import CategorySection from "@/components/sections/CategorySection";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <WelcomeBanner />
        </div>
        <div className="border-t border-line bg-gradient-to-b from-surface via-canvas to-brand-subtle/30">
          <CategorySection />
          <ProductSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
