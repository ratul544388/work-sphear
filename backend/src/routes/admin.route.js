import express from "express";
import {
  changeEmployeeRole,
  createPaymentIntent,
  fireEmployee,
  getEmployees,
  getPayrolls,
  updateSalary,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/employees", authMiddleware("ADMIN"), getEmployees);

router.get("/payrolls", authMiddleware("ADMIN"), getPayrolls);

router.patch(
  "/employees/:id/role",
  authMiddleware("ADMIN"),
  changeEmployeeRole
);

router.patch("/employees/:id/fire", authMiddleware("ADMIN"), fireEmployee);

router.patch("/employees/:id/salary", authMiddleware("ADMIN"), updateSalary);

router.post('/create-payment-intent', authMiddleware("ADMIN"), createPaymentIntent);

export default router;
