import { Hono } from "hono";
import { authController, checkUsername, logoutController } from "../controllers/user.controller";

const userRouter = new Hono()

userRouter.post("/sign-up", authController)
userRouter.post("/check-username", checkUsername)
userRouter.post("/logout", logoutController)

export default userRouter;