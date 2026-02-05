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
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {orders.map(order => {
        const total = order.items.reduce(
          (sum: number, i: any) =>
            sum + i.price * i.quantity,
          0
        )

        return (
          <div
            key={order.id}
            className="bg-white shadow rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">
                  Order #{order.id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="text-sm text-gray-700">
              <p>
                <b>Name:</b> {order.name}
              </p>
              <p>
                <b>Address:</b> {order.address}
              </p>
              <p>
                <b>Phone:</b> {order.phone}
              </p>
            </div>

            <div className="border-t pt-4 space-y-3">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover"
                    />

                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <p className="font-bold">
                Total: ₹{total}
              </p>

              <Link
                href={`/order/${order.id}`}
                className="text-sm bg-black text-white px-4 py-2 rounded-lg"
              >
                Track Order
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}