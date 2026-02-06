"use client"

import { useEffect, useState } from "react"

const emptyState = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: ""
}

export default function MenuForm({
  editingItem,
  onDone
}: {
  editingItem?: any
  onDone?: () => void
}) {
  const [form, setForm] = useState(emptyState)
  const isEditing = Boolean(editingItem)

  useEffect(() => {
    if (editingItem) {
      setForm({
        id: editingItem.id,
        name: editingItem.name,
        description: editingItem.description,
        price: String(editingItem.price),
        image: editingItem.image
      })
    }
  }, [editingItem])

  const submit = async () => {
    if (isEditing) {
      await fetch(`/api/menu/${form.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: form.image
        })
      })
    } else {
      await fetch("/api/menu", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price: Number(form.price)
        })
      })
    }

    setForm(emptyState)
    onDone?.()
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          {isEditing ? "Edit Menu Item" : "Add Menu Item"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Update details of the selected food item"
            : "Create a new food item that will appear in the menu"}
        </p>
      </div>

      <div className="space-y-7">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField label="Item name">
            <input
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              className="admin-input"
            />
          </FormField>

          <FormField label="Price (₹)">
            <input
              type="number"
              value={form.price}
              onChange={e =>
                setForm({ ...form, price: e.target.value })
              }
              className="admin-input"
            />
          </FormField>
        </div>

        <FormField label="Description">
          <textarea
            rows={4}
            value={form.description}
            onChange={e =>
              setForm({ ...form, description: e.target.value })
            }
            className="admin-textarea"
          />
        </FormField>

        <FormField label="Image URL">
          <input
            value={form.image}
            onChange={e =>
              setForm({ ...form, image: e.target.value })
            }
            className="admin-input"
          />
        </FormField>

        {form.image && (
          <div className="rounded-2xl border bg-gray-50 p-4">
            <img
              src={form.image}
              className="h-44 w-full rounded-xl object-cover"
            />
          </div>
        )}

        <button
          onClick={submit}
          className="w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-medium text-white hover:bg-black transition"
        >
          {isEditing ? "Update item" : "Add item"}
        </button>
      </div>
    </section>
  )
}

function FormField({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  )
}