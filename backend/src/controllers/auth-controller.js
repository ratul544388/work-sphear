import bcrypt from "bcryptjs";
import { db } from "../lib/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { registerSchema } from "../validations/index.js";
import { setAuthCookie } from "../utils/set-auth-cookie.js";
import { formatUserResponse } from "../utils/format-user-response.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = registerSchema.parse(req.body);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email already in use.", field: "email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  setAuthCookie(newUser, res);
  const user = formatUserResponse(newUser);

  return res.status(201).json({ user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Email does not exist", field: "email" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "Incorrect password", field: "password" });
  }

  setAuthCookie(user, res);
  const formattedUser = formatUserResponse(user);

  return res.status(200).json({
    message: "Login successfull",
    user: formattedUser,
  });
});

export const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  return res.status(200).json({ message: "Logout" });
};
