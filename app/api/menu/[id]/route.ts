import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id?: string }> }
) {

  const { id } = await context.params

  if (!id) {
    return Response.json(
      { error: "Menu item id is required" },
      { status: 400 }
    )
  }

  await prisma.menuItem.delete({
    where: { id }
  })

  return Response.json({ success: true })
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id?: string }> }
) {
  const { id } = await context.params
  const body = await req.json()

  if (!id) {
    return Response.json(
      { error: "Menu item id is required" },
      { status: 400 }
    )
  }

  const updated = await prisma.menuItem.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      image: body.image
    }
  })

  return Response.json(updated)
}