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