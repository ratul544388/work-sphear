import express from "express";
import {
  changeEmployeeRole,
  completeProfile,
  fireEmployee,
  getAllEmployees,
  getCurrentUser,
  getEmployeeById,
  getEmployeeNames,
  getEmployees,
  toggleVerified,
  updateEmployeeSalary
} from "../controllers/users-controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { optionalMiddleware } from "../middlewares/optional-auth-middleware.js";

const router = express.Router();

router.get("/me", optionalMiddleware, getCurrentUser);
router.get("/employees", authMiddleware("HR"), getEmployees);
router.get("/employees/names", authMiddleware("HR"), getEmployeeNames);
router.get("/employees/all", authMiddleware("ADMIN"), getAllEmployees);
router.get("/:employeeId", authMiddleware("HR"), getEmployeeById);

router.patch(
  "/:employeeId/toggle-verified",
  authMiddleware("HR"),
  toggleVerified
);
router.patch("/:employeeId/role", authMiddleware("ADMIN"), changeEmployeeRole);
router.patch("/:employeeId/fire", authMiddleware("ADMIN"), fireEmployee);
router.patch("/:employeeId/salary", authMiddleware("ADMIN"), updateEmployeeSalary);

router.put("/me/complete-profile", optionalMiddleware, completeProfile);

export default router;
