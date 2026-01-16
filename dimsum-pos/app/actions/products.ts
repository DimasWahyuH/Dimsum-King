'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProducts(query?: string) {
    try {
        const data = await prisma.product.findMany({
            where: query ? {
                OR: [
                    { name: { contains: query } },
                    { category: { contains: query } }
                ]
            } : undefined,
            orderBy: { createdAt: 'desc' }
        })
        return data.map(p => ({
            ...p,
            price: Number(p.price),
            costPrice: Number(p.costPrice)
        }))
    } catch (error) {
        console.error("Database Error:", error)
        return []
    }
}

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const price = parseFloat(formData.get('price') as string)
    const costPrice = parseFloat(formData.get('costPrice') as string)
    const stock = parseInt(formData.get('stock') as string)
    const imageUrl = formData.get('imageUrl') as string || null

    try {
        await prisma.product.create({
            data: {
                name,
                category,
                price,
                costPrice,
                stock,
                imageUrl
            }
        })
        revalidatePath('/products')
        revalidatePath('/pos')
        return { success: true }
    } catch (e: any) {
        return { error: e.message }
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({ where: { id } })
        revalidatePath('/products')
        revalidatePath('/pos')
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete" }
    }
}
export async function updateProduct(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const price = parseFloat(formData.get('price') as string);
    const costPrice = parseFloat(formData.get('costPrice') as string);
    const stock = parseInt(formData.get('stock') as string);
    const imageUrl = formData.get('imageUrl') as string || null;
    try {
        await prisma.product.update({
            where: { id },
            data: { name, category, price, costPrice, stock, imageUrl },
        });
        revalidatePath('/products');
        revalidatePath('/pos');
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}
