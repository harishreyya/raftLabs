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
    <div className="space-y-3">
      <input
        placeholder="Name"
        className="input"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Address"
        className="input"
        onChange={e =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        className="input"
        onChange={e =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white w-full py-2 rounded"
      >
        Place Order
      </button>
    </div>
  )
}