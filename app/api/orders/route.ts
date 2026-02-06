import { prisma } from "@/lib/prisma"

const getStatusFromTime = (createdAt: Date) => {
  const diff = (Date.now() - new Date(createdAt).getTime()) / 1000

  if (diff < 5) return "Order Received"
  if (diff < 10) return "Preparing"
  if (diff < 15) return "Out for Delivery"
  return "Delivered"
}

export async function POST(req: Request) {
  const body = await req.json()

  const order = await prisma.order.create({
    data: {
      ...body,
      status: "Order Received"
    }
  })

  return Response.json(order)
}

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id")

  if (!id) {
    return Response.json({ error: "Invalid id" }, { status: 400 })
  }

  const order = await prisma.order.findUnique({
    where: { id }
  })

  if (!order) return Response.json(null)

  const nextStatus = getStatusFromTime(order.createdAt)

  if (order.status !== nextStatus) {
    await prisma.order.update({
      where: { id },
      data: { status: nextStatus }
    })
  }

  return Response.json({
    ...order,
    status: nextStatus
  })
}