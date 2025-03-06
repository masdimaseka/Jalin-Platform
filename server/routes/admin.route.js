import express from "express";
import { protectRouteAdmin } from "../middleware/auth.middleware.js";
import {
  checkAuthAdmin,
  getPenjahit,
  getUser,
  loginAdmin,
  logoutAdmin,
  verifyPenjahit,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/check-admin", protectRouteAdmin, checkAuthAdmin);

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/penjahit", protectRouteAdmin, getPenjahit);
router.post("/verify/:id", verifyPenjahit);

router.get("/user", protectRouteAdmin, getUser);

export default router;
