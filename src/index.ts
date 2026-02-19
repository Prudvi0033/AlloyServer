import { Hono } from "hono";
import { connectDb } from "./lib/db";
import router from "./routes/global.route";
import { cors } from "hono/cors";

const app = new Hono()

app.use(
  cors({
    origin: ["chrome-extension://gclcclfgdmpgcfielbnfennneighipkh","http://localhost:5173"],
    credentials: true,
  })
);

app.get("/health", (c) => {
    return c.text("Hello")
})
app.route("/api/v1", router)


connectDb()

export default {
    port: 5000,
    fetch: app.fetch
}