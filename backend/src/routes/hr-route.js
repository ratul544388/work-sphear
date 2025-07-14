import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createPayroll, getEmployees } from '../controllers/hr-controller.js';

const router = express.Router();

router.get("/employees", authMiddleware("HR"), getEmployees)

router.post("/:employeeId", authMiddleware(["HR"]), getEmployees);

router.post("/payroll/:employeeId", authMiddleware("HR"), createPayroll)


export default router;