"use client"

import { useCart } from "@/context/CartContext"
import CartItemRow from "@/components/cart/CartItemRow"
import CheckoutForm from "@/components/cart/CheckoutForm"

export default function CartPage() {
  const { cart } = useCart()

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {cart.length === 0 && (
        <p className="text-gray-500">Cart is empty</p>
      )}

      {cart.map(item => (
        <CartItemRow key={item.id} item={item} />
      ))}

      {cart.length > 0 && (
        <>
          <div className="text-right font-semibold">
            Total: ₹{total}
          </div>
          <CheckoutForm />
        </>
      )}
    </div>
  )
}