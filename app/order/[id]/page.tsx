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
      if (intervalRef.current)
        clearInterval(intervalRef.current)
    }
  }, [id])

  if (!order)
    return (
      <div className="text-center mt-16 text-gray-500">
        Loading order...
      </div>
    )

  const total = order.items.reduce(
    (sum: number, i: any) =>
      sum + i.price * i.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Order Details
          </h1>

          <Link
            href="/"
            className="text-sm bg-black text-white px-4 py-2 rounded-lg"
          >
            ⬅ Home
          </Link>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <p className="text-gray-500">Current Status</p>

          <h2
            className={`text-2xl font-bold mt-2 ${
              order.status === "Delivered"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {order.status}
          </h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg">
            Items Ordered
          </h3>

          {order.items.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="h-14 w-14 rounded object-cover"
                />

                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="text-right font-bold pt-3">
            Total: ₹{total}
          </div>
        </div>
      </div>
    </main>
  )
}