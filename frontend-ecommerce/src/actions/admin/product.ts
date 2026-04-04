"use server";

import { FormState, ProductFormSchema } from "@/lib/productDefinition";
import { getBackendBaseUrl } from "@/lib/url";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const base = () => getBackendBaseUrl();

export async function getProductsAdmin() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  try {
    const res = await fetch(`${base()}/admin/api/products/all`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createProduct(state: FormState, formData: FormData) {
  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
    quantity: Number(formData.get("quantity")),
    active: formData.get("active") === "true",
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const productData = validatedFields.data;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  const formDataToSend = new FormData();
  formDataToSend.append("name", productData.name);
  formDataToSend.append("price", productData.price.toString());
  if (productData.description) {
    formDataToSend.append("description", productData.description);
  }
  formDataToSend.append("quantity", productData.quantity.toString());
  formDataToSend.append("active", productData.active.toString());
  if (productData.category) {
    formDataToSend.append("category", productData.category);
  }

  const imageFile = formData.get("imageUrl");
  if (imageFile instanceof File) {
    formDataToSend.append("image", imageFile);
  }

  const response = await fetch(`${base()}/admin/api/products/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
    body: formDataToSend,
  });

  if (!response.ok) {
    return { message: "Failed to create product." };
  }
  redirect("/admin/products");

  return { message: "Product created successfully!" };
}

export async function updateProduct(
  state: FormState,
  formData: FormData,
  productId: string,
  originalImageUrl: string | null,
) {
  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
    quantity: Number(formData.get("quantity")),
    active: formData.get("active") === "true",
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const productData = validatedFields.data;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  const formDataToSend = new FormData();
  formDataToSend.append("name", productData.name);
  formDataToSend.append("price", productData.price.toString());
  if (productData.description) {
    formDataToSend.append("description", productData.description);
  }
  formDataToSend.append("quantity", productData.quantity.toString());
  formDataToSend.append("active", productData.active.toString());
  if (productData.category) {
    formDataToSend.append("category", productData.category);
  }
  const imageFile = formData.get("imageUrl");

  if (originalImageUrl) {
    formDataToSend.append("existingImage", originalImageUrl);
  } else if (imageFile) {
    formDataToSend.append("image", imageFile);
  }

  const response = await fetch(
    `${base()}/admin/api/products/update/${productId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      body: formDataToSend,
    },
  );

  if (!response.ok) {
    return { message: "Failed to update product." };
  }
  redirect("/admin/products");

  return { message: "Product updated successfully!" };
}

export async function deleteProduct(productId: string) {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  try {
    const res = await fetch(
      `${base()}/admin/api/products/delete/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      },
    );
    if (!res.ok) throw new Error("Failed to delete product");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
