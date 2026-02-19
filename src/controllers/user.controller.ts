import type { Context } from "hono";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupController = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ data: "Username and password are required" }, 400);
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUser) {
      return c.json({ data: "Username already exists" }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return c.json({
      data: {
        token,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ data: "Internal Server Error" }, 500);
  }
};

export const loginController = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      return c.json({ data: "Username and password are required" }, 400);
    }

    const user = await User.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      return c.json({ data: "Invalid credentials" }, 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return c.json({ data: "Invalid credentials" }, 401);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return c.json({
      data: {
        token,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ data: "Internal Server Error" }, 500);
  }
};

export const logoutController = async (c: Context) => {
  return c.json({ data: "Logged out successfully" }, 200);
};