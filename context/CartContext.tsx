"use client"

import { createContext, useContext, useState } from "react"
import { CartItem } from "@/lib/types"

type CartContextType = {
  cart: CartItem[]
  addOrUpdateItem: (item: CartItem, qty: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addOrUpdateItem = (item: CartItem, qty: number) => {
    if (qty <= 0) return

    setCart(prev => {
      const existing = prev.find(p => p.id === item.id)

      if (existing) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + qty }
            : p
        )
      }

      return [...prev, { ...item, quantity: qty }]
    })
  }

  const removeItem = (id: string) =>
    setCart(prev => prev.filter(p => p.id !== id))

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, addOrUpdateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)!