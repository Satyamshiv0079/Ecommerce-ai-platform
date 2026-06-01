'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(2),
  stock: z.number().int().min(0),
  image: z.string().url("Please provide a valid image URL"),
  isActive: z.boolean().default(true),
});

export async function createProduct(data: any) {
  try {
    const validated = productSchema.parse(data);

    const product = await prisma.product.create({
      data: validated,
    });

    revalidatePath('/admin/products');
    revalidatePath('/admin/dashboard');

    return { success: true, product };
  } catch (error: any) {
    console.error(error);
    return { 
      success: false, 
      error: error.message || "Failed to create product" 
    };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const validated = productSchema.parse(data);

    const product = await prisma.product.update({
      where: { id },
      data: validated,
    });

    revalidatePath('/admin/products');
    revalidatePath('/admin/dashboard');

    return { success: true, product };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || "Failed to update product" 
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath('/admin/products');
    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: "Failed to delete product" 
    };
  }
}
