import express from "express";

import { db } from "../lib/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { contactMessageSchema } from "../validations/index.js";

const contact = asyncHandler(async (req, res) => {
  const values = contactMessageSchema.parse(req.body);
  await db.contactMessage.create({
    data: values,
  });

  return res.status(201).json({ message: "Message was sent" });
});

const router = express.Router();

router.post("/", contact);

export default router;
