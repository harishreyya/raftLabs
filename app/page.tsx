import Link from "next/link"
import MenuItemCard from "@/components/menu/MenuItemCard"

async function getMenu() {
  const res = await fetch("http://localhost:3000/api/menu", {
    cache: "no-store"
  })
  return res.json()
}

export default async function Page() {
  const items = await getMenu()

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Welcome to FoodieHub 👋
          </h1>

          <p className="text-gray-600 text-lg">
            Fresh meals. Fast delivery. Order your favorite food now.
          </p>

          <Link
            href="#menu"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl"
          >
            Explore Menu
          </Link>
        </div>
      </section>

      <section id="menu" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-8">
          Popular Dishes
        </h2>

        {items.length === 0 && (
          <p className="text-gray-500">
            No items found. Please add from Admin dashboard.
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item: any) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        © 2026 FoodieHub • Built with Next.js
      </footer>
    </main>
  )
}