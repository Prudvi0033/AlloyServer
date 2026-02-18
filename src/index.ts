import { Hono } from "hono";
import { connectDb } from "./lib/db";

const app = new Hono()

app.get("/", (c) => {
    return c.text("Hello")
}
)

connectDb()

export default {
    port: 5000,
    fetch: app.fetch
}