import { Hono } from "hono";
import { connectDb } from "./lib/db";
import router from "./routes/global.route";

const app = new Hono()

app.route("/api/v1", router)

app.get("/", (c) => {
    return c.text("Hello")
}
)

connectDb()

export default {
    port: 5000,
    fetch: app.fetch
}