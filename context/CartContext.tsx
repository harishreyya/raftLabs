"use client"

import { createContext, useContext, useState } from "react"
import { CartItem } from "@/lib/types"

type CartContextType = {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id)
      if (found)
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) =>
    setCart(prev => prev.filter(p => p.id !== id))

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)!