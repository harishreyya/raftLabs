"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function OrderStatus() {
  const params = useParams()
  const id = params?.id as string

  const [order, setOrder] = useState<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchOrder = async () => {
    const res = await fetch(`/api/orders?id=${id}`)
    if (!res.ok) return

    const data = await res.json()
    setOrder(data)

    if (data.status === "Delivered" && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    if (!id) return

    fetchOrder()
    intervalRef.current = setInterval(fetchOrder, 2000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [id])

  if (!order)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-500">
        Loading order details…
      </div>
    )

  const total = order.items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order Details
            </h1>
            <p className="text-sm text-gray-500">
              Order #{order.id.slice(-6)}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/orders"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              ← Orders
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
            >
              Home
            </Link>
          </div>
        </header>

        <section className="rounded-3xl bg-white border border-gray-200 shadow-sm p-8 text-center">
          <p className="text-sm text-gray-500">
            Current Status
          </p>

          <h2
            className={`mt-2 text-3xl font-bold ${
              order.status === "Delivered"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {order.status}
          </h2>
        </section>

        <section className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 space-y-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Items Ordered
          </h3>

          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-xl object-cover border border-gray-200"
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-4">
            <p className="text-lg font-semibold text-gray-900">
              Total ₹{total}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}