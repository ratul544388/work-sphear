import jwt from "jsonwebtoken";
import { db } from "../lib/db.js";
import { USER_SELECT } from "../constants/index.js";

export const optionalMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;
    if (!token) {
      req.user = null;
      return next();
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: {
        id: decode.id,
      },
      select: USER_SELECT
    });

    req.user = user;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};
