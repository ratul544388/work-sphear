import { USER_SELECT } from "../constants/index.js";
import { db } from "../lib/db.js";
import { stripe } from "../lib/stripe.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await db.user.findMany({
    where: {
      role: {
        in: ["EMPLOYEE", "HR"],
      },
    },
    select: USER_SELECT,
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(employees);
});

export const getPayrolls = asyncHandler(async (req, res) => {
  const payrolls = await db.payroll.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(payrolls);
});

export const changeEmployeeRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  await db.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
    },
  });

  return res.status(200).json({ success: true });
});

export const fireEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      isFired: true,
    },
    select: {
      name: true,
    },
  });

  return res.status(200).json({ message: `${user.name} is fired` });
});

export const updateSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { salary } = req.body;

  await db.user.update({
    where: {
      id,
    },
    data: {
      salary: Number(salary),
    },
    select: {
      name: true,
    },
  });

  return res.status(200).json({ seuccess: true });
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
    return res.status(400).json({ error: "Payroll not found or already paid" });
  }

  const amountInCents = payroll.salary * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      payrollId: payroll.id,
      userId: payroll.user.id,
      email: payroll.user.email,
    }
  })

  res.send({
    clientSecret: paymentIntent.client_secret
  })
});
