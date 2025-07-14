import express from "express";
import {
  completeProfile,
  getCurrentUser
} from "../controllers/users-controller.js";
import { optionalMiddleware } from "../middlewares/optional-auth-middleware.js";

const router = express.Router();

router.get("/me", optionalMiddleware, getCurrentUser);

router.put("/me/complete-profile", optionalMiddleware, completeProfile);

export default router;
