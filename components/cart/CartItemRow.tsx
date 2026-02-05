"use client"

import { CartItem } from "@/lib/types"
import { useCart } from "@/context/CartContext"

export default function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem } = useCart()

  const lineTotal = item.price * item.quantity

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-14 w-14 rounded-xl object-cover border border-gray-200"
        />

        <div>
          <p className="font-medium text-gray-900">
            {item.name}
          </p>

          <p className="text-sm text-gray-500">
            ₹{item.price} × {item.quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span className="font-semibold text-gray-900">
          ₹{lineTotal}
        </span>

        <button
          onClick={() => removeItem(item.id)}
          className="text-xs font-medium text-gray-400 hover:text-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  )
}