import { Prisma } from "@prisma/client";
import { db } from "../lib/db.js";
import { payrollSchema } from "../validations/index.js";
import { asyncHandler } from "../utils/async-handler.js";
import { MonthNumberToStringMap } from "../constants/index.js";

export const createPayroll = async (req, res) => {
  try {
    const values = payrollSchema.parse(req.body);
    const { employeeId } = req.params;

    const newPayroll = await db.payroll.create({
      data: {
        ...values,
        userId: employeeId,
      },
    });

    return res.status(201).json(newPayroll);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.error("Duplicate payroll entry for this user/month/year.");
      return res.status(409).json({
        message: "Payroll for this user and period already exists.",
      });
    }
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getChartData = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const payrolls = await db.payroll.findMany({
    where: {
      userId: employeeId,
    },
    select: {
      month: true,
      salary: true,
    },
  });

  const payrollMap = payrolls.reduce((acc, item) => {
    acc[item.month] = item.salary;
    return acc;
  }, {});

  const data = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      month: MonthNumberToStringMap[month],
      salary: payrollMap[month] || 0,
    };
  });

  return res.status(200).json(data);
});
