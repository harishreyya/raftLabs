"use client"

import { useEffect, useState } from "react"
import MenuForm from "./MenuForm"
import Modal from "@/components/ui/Modal"

export default function MenuTable() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [open, setOpen] = useState(false)

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

  const openAdd = () => {
    setEditing(null)
    setOpen(true)
  }

  const openEdit = (item: any) => {
    setEditing(item)
    setOpen(true)
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Menu Items
        </h3>

        <button
          onClick={openAdd}
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black transition"
        >
          + Add item
        </button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  ₹{item.price}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => openEdit(item)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => remove(item.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Menu Item" : "Add Menu Item"}
      >
        <MenuForm
          editingItem={editing}
          onDone={() => {
            setOpen(false)
            setEditing(null)
            load()
          }}
        />
      </Modal>
    </section>
  )
}