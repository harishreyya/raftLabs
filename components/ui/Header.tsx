"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          🍔 FoodieHub
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-black text-gray-600">
            Menu
          </Link>

          <Link href="/cart" className="hover:text-black text-gray-600">
            Cart
          </Link>

          <Link href="/orders" className="hover:text-black text-gray-600">
            Orders
          </Link>

          <Link
            href="/admin"
            className="bg-black text-white px-3 py-1 rounded-lg"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}