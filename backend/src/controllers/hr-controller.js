import { db } from "../lib/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { payrollSchema } from "../validations/index.js";

export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await db.user.findMany({
    where: {
      role: "EMPLOYEE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(employees)
});

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