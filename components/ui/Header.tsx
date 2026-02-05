"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Utensils, ClipboardList, Shield } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { cart } = useCart()
  const pathname = usePathname()

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const navItem = (href: string, label: string, Icon: any) => {
    const active = pathname === href

    return (
      <Link
        href={href}
        className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition
          ${
            active
              ? "bg-gray-900 text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>

        {href === "/cart" && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-semibold text-white">
            {totalItems}
          </span>
        )}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-gray-900 tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
              🍔
            </span>
            <span className="text-lg">FoodieHub</span>
          </Link>

          <nav className="flex items-center gap-2">
            {navItem("/", "Menu", Utensils)}
            {navItem("/cart", "Cart", ShoppingCart)}
            {navItem("/orders", "Orders", ClipboardList)}

            <Link
              href="/admin"
              className="ml-2 flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}