import { prisma } from "@/lib/prisma"

export async function simulateOrder(id: string) {
  const steps = ["Preparing", "Out for Delivery", "Delivered"]

  steps.forEach((status, i) => {
    setTimeout(async () => {
      await prisma.order.update({
        where: { id },
        data: { status }
      })
    }, (i + 1) * 5000)
  })
}