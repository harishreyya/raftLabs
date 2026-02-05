"use client"

import { useCart } from "@/context/CartContext"

export default function MenuItemCard({ item }: any) {
  const { addItem } = useCart()

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <img src={item.image} className="h-40 w-full object-cover rounded" />
      <h3 className="font-semibold mt-2">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <div className="flex justify-between mt-3">
        <span>₹{item.price}</span>
        <button
          onClick={() => addItem(item)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  )
}