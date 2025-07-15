import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { db } from "./lib/db.js";

import "./lib/passport.js";

import authRoutes from "./routes/auth.route.js";
import cloudinaryRoute from "./routes/cloudinary.route.js";
import contactRoutes from "./routes/contact.route.js";
import payrollsRoute from "./routes/payrolls.route.js";
import usersRoute from "./routes/users-route.js";
import workEntriesRoute from "./routes/work-entries.route.js";
import stripeWebhookRoute from "./routes/webhooks/stripe.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: process.env.VITE_APP_URL,
    credentials: true,
  })
);

app.use("/api/webhooks/stripe", stripeWebhookRoute);

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);
app.use("/api/work-entries", workEntriesRoute);
app.use("/api/payrolls", payrollsRoute);
app.use("/api/cloudinary", cloudinaryRoute);
app.use("/api/contact", contactRoutes);

app.get("/test", (req, res) => {
  res.send({
    secure: process.env.NODE_ENV === "production",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await db.$connect();
    console.log("✅✅✅ Connected to MongoDB via Prisma");
  } catch (error) {
    console.error("❌❌❌ Prisma connection failed", error);
  }
});
