import MenuForm from "@/components/admin/MenuForm"
import MenuTable from "@/components/admin/MenuTable"
import OrdersTable from "@/components/admin/OrdersTable"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Manage your menu items, monitor customer orders, and keep
            everything running smoothly.
          </p>
        </header>

        <section className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
              <MenuTable />
          </div>

            <OrdersTable />
        </section>
      </div>
    </main>
  )
}