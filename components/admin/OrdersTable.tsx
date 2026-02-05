"use client"

import { useEffect, useState } from "react"

export default function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([])

  const load = async () => {
    const res = await fetch("/api/orders/all")
    setOrders(await res.json())
  }

  useEffect(() => {
    load()
  }, [])

  const remove = async (id: string) => {
    await fetch(`/api/orders/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Customer Orders
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Live overview of all recent orders
        </p>
      </div>

      <div className="space-y-6">
        {orders.map(order => {
          const total = order.items.reduce(
            (sum: number, i: any) =>
              sum + i.price * i.quantity,
            0
          )

          return (
            <div
              key={order.id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
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

              <div className="rounded-xl bg-white border border-gray-200 p-4 text-sm">
                <p className="font-medium text-gray-900">
                  {order.name}
                </p>
                <p className="text-gray-600">
                  {order.phone}
                </p>
                <p className="text-gray-500 text-xs mt-1">
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

                <button
                  onClick={() => remove(order.id)}
                  className="text-xs font-medium text-gray-400 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}

        {orders.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500">
            No orders yet
          </div>
        )}
      </div>
    </section>
  )
}