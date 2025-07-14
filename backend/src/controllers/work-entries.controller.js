import { startOfMonth } from "date-fns";
import { db } from "../lib/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { workEntrySchema } from "../validations/index.js";
import { monthNameToNumber } from "../utils/helpers/index.js";

export const createWorkEntry = asyncHandler(async (req, res) => {
  const values = workEntrySchema.parse(req.body);
  const newEntry = await db.workEntry.create({
    data: {
      ...values,
      userId: req.user.id,
    },
  });

  return res.status(201).json(newEntry);
});

export const updateWorkEntry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const values = workEntrySchema.parse(req.body);
  const updatedEntry = await db.workEntry.update({
    where: {
      id,
    },
    data: values,
  });

  return res.status(200).json(updatedEntry);
});

export const getWorkEntries = asyncHandler(async (req, res) => {
  const { user_id, task, order_by = "desc", month, employee_name } = req.query;
  const user = req.user;

  const monthNumber = monthNameToNumber(month);
  const yearNumber = new Date().getFullYear();

  const workEntries = await db.workEntry.findMany({
    where: {
      ...(user.role === "EMPLOYEE" ? { userId: req.user.id } : {}),
      ...(user.role === "HR"
        ? {
            ...(user_id ? { userId: user_id } : {}),
          }
        : {}),
      ...(employee_name
        ? {
            user: {
              name: employee_name,
            },
          }
        : {}),
      ...(task ? { task: task.toUpperCase() } : {}),
      ...(month
        ? {
            date: {
              gte: startOfMonth(new Date(yearNumber, monthNumber)),
              lt: startOfMonth(new Date(yearNumber, monthNumber + 1)),
            },
          }
        : {}),
    },
    include: {
      ...(user.role === "HR"
        ? {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          }
        : {}),
    },
    orderBy: {
      createdAt: order_by,
    },
  });

  return res.status(200).json(workEntries);
});

export const deleteWorkEntry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.workEntry.delete({
    where: {
      id,
    },
  });

  return res.status(200).json({ message: "Work entry deleted" });
});
