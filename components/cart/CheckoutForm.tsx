"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

export default function CheckoutForm() {
  const router = useRouter()
  const { cart, clearCart } = useCart()

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  })

  const handleSubmit = async () => {
    if (!form.name || !form.address || !form.phone) return

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        items: cart
      })
    })

    const order = await res.json()

    clearCart()
    router.push(`/order/${order.id}`)
  }

  return (
    <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">
        Delivery details
      </h3>

      <div className="space-y-3">
        <input
          placeholder="Full name"
          className="admin-input"
          onChange={e =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Delivery address"
          className="admin-input"
          onChange={e =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          placeholder="Phone number"
          className="admin-input"
          onChange={e =>
            setForm({ ...form, phone: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white hover:bg-black transition"
      >
        Place order
      </button>

      <p className="text-xs text-gray-500 text-center">
        You’ll be redirected to live order tracking
      </p>
    </div>
  )
}