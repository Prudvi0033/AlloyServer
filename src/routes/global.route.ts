import { Hono } from "hono";
import userRouter from "./user.route";

const router = new Hono()

router.route("/auth", userRouter)

export default router;