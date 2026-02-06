import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MenuItemCard from "@/components/menu/MenuItemCard"
import { CartProvider } from "@/context/CartContext"

const item = {
  id: "1",
  name: "Pizza",
  description: "Cheese",
  price: 200,
  image: "img"
}

test("increments quantity and adds to cart", async () => {
  render(
    <CartProvider>
      <MenuItemCard item={item} />
    </CartProvider>
  )

  await userEvent.click(screen.getByText("+"))
  await userEvent.click(screen.getByText("Add to cart"))

  expect(screen.getByText("Added")).toBeInTheDocument()
})