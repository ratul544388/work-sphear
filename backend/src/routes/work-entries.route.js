import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createWorkEntry,
  deleteWorkEntry,
  getWorkEntries,
  updateWorkEntry,
} from "../controllers/work-entries.controller.js";

const router = express.Router();

router.post("/", authMiddleware(["EMPLOYEE"]), createWorkEntry);

router.get("/", authMiddleware(["EMPLOYEE", "HR"]), getWorkEntries);

router.delete("/:id", authMiddleware(["EMPLOYEE"]), deleteWorkEntry);

router.put("/:id", authMiddleware(["EMPLOYEE"]), updateWorkEntry);

export default router;
