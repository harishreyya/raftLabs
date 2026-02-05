"use client"

import { useState } from "react"

const initialState = {
  name: "",
  description: "",
  price: "",
  image: ""
}

export default function MenuForm() {
  const [form, setForm] = useState(initialState)

  const submit = async () => {
    await fetch("/api/menu", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price)
      })
    })

    setForm(initialState)
    location.reload()
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Add Menu Item
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Create a new food item that will appear in the customer menu
        </p>
      </div>

      <div className="space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Item name">
            <input
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Pizza .."
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
              placeholder="249"
              className="admin-input"
            />
          </FormField>
        </div>

        <FormField label="">
          <textarea
            rows={4}
            value={form.description}
            onChange={e =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
            placeholder="Short description about the dish"
            className="admin-textarea"
          />
        </FormField>

        <FormField label="Image URL">
          <input
            value={form.image}
            onChange={e =>
              setForm({ ...form, image: e.target.value })
            }
            placeholder="https://images12345..."
            className="admin-input"
          />
        </FormField>

        {form.image && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <img
              src={form.image}
              alt="Preview"
              className="h-44 w-full rounded-xl object-cover"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={submit}
            className="w-full rounded-2xl bg-gray-900 py-3.5 text-sm font-medium text-white hover:bg-black transition"
          >
            Add item to menu
          </button>
        </div>
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