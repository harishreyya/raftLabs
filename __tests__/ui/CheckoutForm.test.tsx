import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CheckoutForm from "@/components/cart/CheckoutForm"
import { CartProvider } from "@/context/CartContext"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

test("does not submit empty form", async () => {
  render(
    <CartProvider>
      <CheckoutForm />
    </CartProvider>
  )

  await userEvent.click(screen.getByText("Place order"))

  expect(
    screen.queryByText("Loading")
  ).not.toBeInTheDocument()
})