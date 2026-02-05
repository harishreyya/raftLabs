"use client"

import { CartItem } from "@/lib/types"
import { useCart } from "@/context/CartContext"

export default function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCart()

  return (
    <div className="flex justify-between items-center border p-3 rounded">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <span>₹{item.price * item.quantity}</span>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  )
}