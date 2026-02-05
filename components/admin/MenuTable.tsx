"use client"

import { useEffect, useState } from "react"

export default function MenuTable() {
  const [items, setItems] = useState<any[]>([])

  const load = async () => {
    const res = await fetch("/api/menu")
    setItems(await res.json())
  }

  useEffect(() => {
    load()
  }, [])

  const remove = async (id: string) => {
    await fetch(`/api/menu/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
    
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Menu Items
          </h2>
          <p className="text-sm text-gray-500">
            Items currently available to customers
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map(item => (
          <div
            key={item.id}
            className="group flex items-center justify-between py-4 transition hover:bg-gray-50 rounded-xl px-2"
          >
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-xl object-cover flex-shrink-0 border border-gray-200"
              />

              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  ₹{item.price}
                </p>
              </div>
            </div>

            <button
              onClick={() => remove(item.id)}
              className="text-sm text-gray-400 opacity-50 group-hover:opacity-100 hover:text-red-600 hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No menu items yet
          </div>
        )}
      </div>
    </section>
  )
}