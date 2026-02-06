import request from "supertest"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL

describe("Menu API", () => {
  let menuId: string

  it("should create a menu item", async () => {
    const res = await request(BASE_URL!)
      .post("/api/menu")
      .send({
        name: "Test Pizza",
        description: "Cheesy pizza",
        price: 199,
        image: "https://test.com/pizza.jpg"
      })

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Test Pizza")
    menuId = res.body.id
  })

  it("should fetch menu items", async () => {
    const res = await request(BASE_URL!)
      .get("/api/menu")

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("should update menu item", async () => {
    const res = await request(BASE_URL!)
      .patch(`/api/menu/${menuId}`)
      .send({ price: 249 })

    expect(res.status).toBe(200)
    expect(res.body.price).toBe(249)
  })

  it("should delete menu item", async () => {
    const res = await request(BASE_URL!)
      .delete(`/api/menu/${menuId}`)

    expect(res.status).toBe(200)
  })
})