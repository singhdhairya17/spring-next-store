"use server";

import { getBackendBaseUrl } from "@/lib/url";

export async function getProducts() {
  try {
    const res = await fetch(`${getBackendBaseUrl()}/api/products/all`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/** Public product detail (storefront). */
export async function getProductById(productId: string) {
  try {
    const res = await fetch(
      `${getBackendBaseUrl()}/api/products/${productId}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
