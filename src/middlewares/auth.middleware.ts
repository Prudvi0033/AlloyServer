import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return c.json({ message: "User not found" }, 401);
    }

    c.set("user", user);

    await next();
  } catch (error) {
    console.log("Invalid or expired token", error);
    return c.json({ message: "Invalid or expired token" }, 401);
  }
};
