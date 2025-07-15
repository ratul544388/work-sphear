import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createWorkEntry,
  deleteWorkEntry,
  getAllWorkEntries,
  getWorkEntries,
  updateWorkEntry,
} from "../controllers/work-entries.controller.js";

const router = express.Router();

router.get("/", authMiddleware("EMPLOYEE"), getWorkEntries);
router.get("/all", authMiddleware("HR"), getAllWorkEntries);

router.post("/", authMiddleware("EMPLOYEE"), createWorkEntry);

router.delete("/:id", authMiddleware("EMPLOYEE"), deleteWorkEntry);

router.put("/:id", authMiddleware("EMPLOYEE"), updateWorkEntry);

export default router;
