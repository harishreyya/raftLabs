"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/orders/all")
      .then(res => res.json())
      .then(setOrders)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Orders
          </h1>
          <p className="text-sm text-gray-500">
            Track and review your recent food orders
          </p>
        </header>

        {orders.length === 0 && (
          <div className="rounded-2xl bg-white border border-gray-200 p-10 text-center text-gray-500">
            You haven’t placed any orders yet.
          </div>
        )}

        <div className="space-y-6">
          {orders.map(order => {
            const total = order.items.reduce(
              (sum: number, i: any) =>
                sum + i.price * i.quantity,
              0
            )

            return (
              <section
                key={order.id}
                className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6 space-y-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Order #{order.id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm">
                  <p className="font-medium text-gray-900">
                    {order.name}
                  </p>
                  <p className="text-gray-600">
                    {order.phone}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {order.address}
                  </p>
                </div>

                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-11 w-11 rounded-xl object-cover border border-gray-200"
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

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-semibold text-gray-900">
                    Total ₹{total}
                  </p>

                  <Link
                    href={`/order/${order.id}`}
                    className="inline-flex items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
                  >
                    Track order
                  </Link>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}