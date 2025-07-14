import express from "express";
import { login, logout, register } from "../controllers/auth-controller.js";
import passport from "passport";
import { setAuthCookie } from "../utils/set-auth-cookie.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.VITE_APP_URL}/auth/login`,
  }),
  (req, res) => {
    setAuthCookie(req.user, res);
    res.redirect(`${process.env.VITE_APP_URL}`);
  }
);

export default router;
