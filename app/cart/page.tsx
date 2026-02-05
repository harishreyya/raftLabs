"use client"

import { useCart } from "@/context/CartContext"
import CartItemRow from "@/components/cart/CartItemRow"
import CheckoutForm from "@/components/cart/CheckoutForm"
import Link from "next/link"

export default function CartPage() {
  const { cart } = useCart()

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="text-sm text-gray-500">
              Review your items before checkout
            </p>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Continue shopping
          </Link>
        </header>

        {cart.length === 0 && (
          <div className="rounded-3xl bg-white border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              Your cart is currently empty
            </p>
          </div>
        )}

        {cart.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Items in your cart
                </h2>

                <div className="space-y-4">
                  {cart.map(item => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between font-semibold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <CheckoutForm />
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}