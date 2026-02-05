import { prisma } from "@/lib/prisma"

export async function GET() {
  return Response.json(await prisma.menuItem.findMany())
}

export async function POST(req: Request) {
  const body = await req.json()

  const item = await prisma.menuItem.create({
    data: body
  })

  return Response.json(item)
}