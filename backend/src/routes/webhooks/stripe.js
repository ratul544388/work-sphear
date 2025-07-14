import express from "express";
import { db } from "../../lib/db.js";
import { stripe } from "../../lib/stripe.js";

const router = express.Router();
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;

      const payrollId = intent.metadata.payrollId;

      await db.payroll.update({
        where: { id: payrollId },
        data: {
          paidAt: new Date(),
          transactionId: intent.id,
        },
      });
    }

    res.json({ received: true });
  }
);

router.get("/", (req, res) => {
  return res.send({ message: "Webhook is working" });
});

export default router;
