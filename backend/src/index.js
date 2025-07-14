import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { db } from "./lib/db.js";

import "./lib/passport.js";

import authRoutes from "./routes/auth.route.js";
import usersRoute from "./routes/users-route.js";
import cloudinaryRoute from "./routes/cloudinary.route.js";
import adminRoutes from "./routes/admin.route.js";
import hrRoutes from "./routes/hr-route.js";
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

app.get("/", (req, res) => {
  res.send({
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);
app.use("/api/cloudinary", cloudinaryRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/webhooks/stripe", stripeWebhookRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Server is running!!!",
  });
});

app.get("/cross-origin-check", (req, res) => {
  res.send({ VITE_APP_URL: VITE_APP_URL });
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
