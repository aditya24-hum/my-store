'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore, Product } from '@/types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items
        const existing = items.find((i) => i.product.id === product.id)
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),

      count: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)
