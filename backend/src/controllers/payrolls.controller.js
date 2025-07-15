import { Prisma } from "@prisma/client";
import { db } from "../lib/db.js";
import { payrollSchema } from "../validations/index.js";
import { asyncHandler } from "../utils/async-handler.js";
import { MonthNumberToStringMap } from "../constants/index.js";
import { stripe } from "../lib/stripe.js";

export const getPayrollsByEmployeeId = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const [payrolls, total] = await Promise.all([
    db.payroll.findMany({
      where: {
        userId: employeeId,
      },
      orderBy: {
        month: "asc",
      },
      skip,
      take: limit,
    }),
    db.payroll.count({
      where: {
        userId: employeeId,
      },
    }),
  ]);

  return res.status(200).json({
    payrolls,
    totalItems: total,
  });
});

export const getPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await db.payroll.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(payrolls);
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

export const getPayrollChartData = asyncHandler(async (req, res) => {
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

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { payrollId } = req.body;

  const payroll = await db.payroll.findUnique({
    where: {
      id: payrollId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  if (!payroll || payroll.transactionId) {
    return res
      .status(400)
      .json({ message: "Payroll not found or already paid" });
  }

  const amountInCents = payroll.salary * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    metadata: {
      payrollId: payroll.id,
      userId: payroll.user.id,
      email: payroll.user.email,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
