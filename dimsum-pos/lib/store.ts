import { create } from 'zustand'

export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    imageUrl?: string | null
}

interface CartState {
    items: CartItem[]
    addItem: (product: any) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (product) => set((state) => {
        const existing = state.items.find(item => item.id === product.id)
        if (existing) {
            return {
                items: state.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
        }
        return { items: [...state.items, { ...product, quantity: 1 }] }
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),
    updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
    })),
    clearCart: () => set({ items: [] }),
    getTotal: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}))
