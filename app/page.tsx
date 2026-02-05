import Link from "next/link"
import MenuItemCard from "@/components/menu/MenuItemCard"

async function getMenu() {
   const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  const res = await fetch(`${baseUrl}/api/menu`, {
    cache: "no-store"
  })
  return res.json()
}

export default async function Page() {
  const items = await getMenu()

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Delicious food,
            <br /> delivered fast 🍔
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from freshly prepared meals and enjoy quick
            doorstep delivery.
          </p>

          <Link
            href="#menu"
            className="inline-flex items-center rounded-xl bg-gray-900 px-8 py-3 text-white text-sm font-medium hover:bg-black transition"
          >
            Browse menu
          </Link>
        </div>
      </section>

      <section
        id="menu"
        className="max-w-6xl mx-auto px-6 py-14"
      >
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular dishes
          </h2>
          <p className="text-gray-500 mt-1">
            Hand-picked favorites loved by our customers
          </p>
        </header>

        {items.length === 0 && (
          <p className="text-gray-500">
            No items found. Please add from admin dashboard.
          </p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item: any) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

    </main>
  )
}