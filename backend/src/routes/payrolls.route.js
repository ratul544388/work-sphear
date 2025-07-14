import express from "express";

import { createPayroll, getChartData } from "../controllers/payrolls.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:employeeId", authMiddleware(["HR"]), createPayroll);

router.get("/chart-data/:employeeId", authMiddleware(["HR"]), getChartData);

export default router;