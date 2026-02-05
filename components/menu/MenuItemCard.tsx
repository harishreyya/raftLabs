"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import Toast from "@/components/ui/Toast"
import { Check } from "lucide-react"

export default function MenuItemCard({ item }: any) {
  const { addOrUpdateItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const increase = () => setQty(q => q + 1)
  const decrease = () => setQty(q => (q > 1 ? q - 1 : 1))

  const addToCart = () => {
    addOrUpdateItem(item, qty)

    setAdded(true)
    setShowToast(true)
    setQty(1)

    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <>
      <div
        className={`group bg-white rounded-3xl border shadow-sm p-4 flex flex-col transition
          ${
            added
              ? "border-green-500 ring-2 ring-green-200"
              : "border-gray-200 hover:shadow-md"
          }
        `}
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-40 w-full rounded-2xl object-cover"
        />

        <div className="mt-4 flex-1">
          <h3 className="font-semibold text-gray-900">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              ₹{item.price}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={decrease}
                className="h-8 w-8 rounded-full border text-gray-600 hover:bg-gray-100 transition"
              >
                −
              </button>

              <span className="w-6 text-center text-sm font-medium">
                {qty}
              </span>

              <button
                onClick={increase}
                className="h-8 w-8 rounded-full border text-gray-600 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={addToCart}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition
              ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-gray-900 text-white hover:bg-black"
              }
            `}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>

      {showToast && (
        <Toast
          message={`${item.name} added to cart`}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}