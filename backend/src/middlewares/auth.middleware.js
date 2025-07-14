import jwt from "jsonwebtoken";
import { db } from "../lib/db.js";
import { USER_SELECT } from "../constants/index.js";
/**
 * Middleware to authenticate and authorize a user.
 * @param {"HR" | "EMPLOYEE" | "ADMIN"} [role] - Optional role to check for access control.
 */

export const authMiddleware = (role) => async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: {
        id: decode.id,
      },
      select: USER_SELECT,
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (role && user.role !== role) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    if (!user.isProfileCompleted) {
      return res
        .status(403)
        .json({ message: "Forbidden: Complete your profile to proceed" });
    }

    if (user.isFired) {
      return res.status(403).json({ message: "Forbidden: You are fired!!!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
