import { prisma } from "@/lib/prisma"

const getStatusFromTime = (createdAt: Date) => {
  const diff = (Date.now() - new Date(createdAt).getTime()) / 1000

  if (diff < 5) return "Order Received"
  if (diff < 10) return "Preparing"
  if (diff < 15) return "Out for Delivery"
  return "Delivered"
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" }
  })

  const updatedOrders = await Promise.all(
    orders.map(async order => {
      const nextStatus = getStatusFromTime(order.createdAt)

      if (order.status !== nextStatus) {
        const updated = await prisma.order.update({
          where: { id: order.id },
          data: { status: nextStatus }
        })

        return updated
      }

      return order
    })
  )

  return Response.json(updatedOrders)
}