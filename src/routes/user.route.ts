import { Hono } from "hono";
import { loginController, logoutController, signupController } from "../controllers/user.controller";

const userRouter = new Hono()

userRouter.post("/sign-up", signupController)
userRouter.post("/login", loginController)
userRouter.post("/logout", logoutController)

export default userRouter;