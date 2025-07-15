import express from "express";

import {
  createPaymentIntent,
  createPayroll,
  getPayrollChartData,
  getPayrolls,
  getPayrollsByEmployeeId
} from "../controllers/payrolls.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware("ADMIN"), getPayrolls);
router.get("/chart-data/:employeeId", authMiddleware("HR"), getPayrollChartData);
router.get("/:employeeId", authMiddleware("EMPLOYEE"), getPayrollsByEmployeeId);

router.post("/create-payment-intent", authMiddleware("ADMIN"), createPaymentIntent);
router.post("/:employeeId", authMiddleware("HR"), createPayroll);


export default router;
