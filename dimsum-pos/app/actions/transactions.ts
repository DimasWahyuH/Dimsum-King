'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTransaction(items: any[], totalAmount: number, customerData?: { name: string, phone: string }, type: string = 'POS') {
    try {
        const transaction = await prisma.$transaction(async (tx) => {
            let totalProfit = 0

            for (const item of items) {
                const product = await tx.product.findUnique({ where: { id: item.id } })

                if (!product) throw new Error(`Product ${item.name} not found`)
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}`)
                }

                const profitPerItem = Number(product.price) - Number(product.costPrice)
                totalProfit += profitPerItem * item.quantity

                await tx.product.update({
                    where: { id: item.id },
                    data: { stock: product.stock - item.quantity }
                })
            }

            return await tx.transaction.create({
                data: {
                    totalAmount: totalAmount,
                    profit: totalProfit,
                    status: 'COMPLETED',
                    type: type,
                    customerName: customerData?.name,
                    customerPhone: customerData?.phone,
                    items: {
                        create: items.map(item => ({
                            productId: item.id,
                            quantity: item.quantity,
                            priceAtTime: item.price
                        }))
                    }
                }
            })
        })

        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath('/reports')
        revalidatePath('/dashboard')
        return { success: true, transactionId: transaction.id }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getTransactions() {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
        return transactions.map(tx => ({
            ...tx,
            totalAmount: Number(tx.totalAmount),
            profit: Number(tx.profit),
            items: tx.items.map((item: any) => ({
                ...item,
                priceAtTime: Number(item.priceAtTime),
                product: item.product ? {
                    ...item.product,
                    price: Number(item.product.price),
                    costPrice: Number(item.product.costPrice)
                } : null
            }))
        }))
    } catch (error) {
        console.error("Fetch Transactions Error:", error)
        return []
    }
}
