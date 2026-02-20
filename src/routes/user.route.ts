import { Hono } from "hono";
import { getUserInfo, loginController, logoutController, signupController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = new Hono()

userRouter.post("/sign-up", signupController)
userRouter.post("/login", loginController)
userRouter.post("/logout", logoutController)
userRouter.get("/profile", authMiddleware, getUserInfo)

export default userRouter;