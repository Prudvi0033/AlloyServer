import type { Context } from "hono";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authController = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ data: "Username and password are required" }, 400);
    }

    const existingUser = await User.findOne({ username: username.toLowerCase() });

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
        return c.json({ data: "Invalid credentials" }, 401);
      }

      const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      return c.json({
        data: {
          token,
          username: existingUser.username,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    return c.json({
      data: {
        token,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return c.json({ data: "Internal Server Error" }, 500);
  }
};

export const checkUsername = async (c: Context) => {
  try {
    const { username } = await c.req.json();

    if (!username) {
      return c.json({ data: "Username required" }, 400);
    }

    const user = await User.findOne({ username: username.toLowerCase() });

    return c.json({
      data: {
        available: !user,
      },
    });
  } catch (error) {
    console.error(error);
    return c.json({ data: "Internal Server Error" }, 500);
  }
};

export const logoutController = async (c: Context) => {
  return c.json({ data: "Logged out successfully" }, 200);
};