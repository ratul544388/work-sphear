import { USER_SELECT } from "../constants/index.js";
import { db } from "../lib/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { completeProfileSchema } from "../validations/index.js";

export const getUsers = asyncHandler(async (req, res) => {
  const role = req.user.role;
  const users = await db.user.findMany({
    where: {
      role:
        role === "HR"
          ? "EMPLOYEE"
          : {
              in: ["EMPLOYEE", "HR"],
            },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(users);
});

export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await db.user.findMany({
    where: {
      role: "EMPLOYEE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(employees);
});

export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await db.user.findMany({
    where: {
      role: {
        in: ["EMPLOYEE", "HR"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(employees);
});

export const getEmployeeNames = asyncHandler(async (req, res) => {
  const users = await db.user.findMany({
    where: {
      role: "EMPLOYEE",
    },
    select: {
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(users);
});

export const getEmployeeById = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const employee = await db.user.findUnique({
    where: {
      id: employeeId,
    },
    include: {
      _count: {
        select: {
          workEntries: true,
        },
      },
    },
  });

  return res.status(200).json(employee);
});

export const getCurrentUser = asyncHandler((req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
});

export const completeProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const values = completeProfileSchema.parse(req.body);

  const updatedUser = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      ...values,
      isProfileCompleted: true,
    },
    select: USER_SELECT,
  });

  return res.status(200).json(updatedUser);
});

export const toggleVerified = asyncHandler(async (req, res) => {
  const { isVerified } = req.body;
  const { employeeId } = req.params;

  await db.user.update({
    where: {
      id: employeeId,
    },
    data: {
      isVerified: !isVerified,
    },
  });

  return res.status(200).json({ success: true });
});

export const fireEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = await req.params;

  const employee = await db.user.update({
    where: {
      id: employeeId,
    },
    data: {
      isFired: true,
    },
    select: {
      name: true,
    },
  });

  return res.status(200).json({ message: `${employee.name} is fired` });
});

export const changeEmployeeRole = asyncHandler(async (req, res) => {
  const { employeeId } = await req.params;
  const { role } = await req.body;

  const employee = await db.user.update({
    where: {
      id: employeeId,
    },
    data: {
      role,
    },
    select: {
      name: true,
    },
  });

  return res.status(200).json({ message: `${employee.name} is now ${role}` });
});

export const updateEmployeeSalary = asyncHandler(async (req, res) => {
  const { employeeId } = await req.params;
  const { salary } = await req.body;
  const employee = await db.user.update({
    where: {
      id: employeeId,
    },
    data: {
      salary,
    },
    select: {
      name: true,
    },
  });

  return res.status(200).json({ message: `${employee.name}'s salary updated` });
});
