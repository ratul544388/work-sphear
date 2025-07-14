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

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          workEntries: true,
        },
      },
    },
  });

  return res.status(200).json(user);
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
  const { id } = req.params;

  await db.user.update({
    where: {
      id,
    },
    data: {
      isVerified: !isVerified,
    },
  });

  return res.status(200).json({ success: true });
});
