import express from "express";
import { protectRouteAdmin } from "../middleware/auth.middleware.js";
import {
  checkAuthAdmin,
  getCategoryByAdmin,
  getPenjahitByAdmin,
  getUserByAdmin,
  loginAdmin,
  logoutAdmin,
  registerCategoryByAdmin,
  verifyPenjahit,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/check-admin", protectRouteAdmin, checkAuthAdmin);

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/penjahit", protectRouteAdmin, getPenjahitByAdmin);
router.post("/verify/:id", protectRouteAdmin, verifyPenjahit);

router.get("/user", protectRouteAdmin, getUserByAdmin);

router.get("/category", protectRouteAdmin, getCategoryByAdmin);
router.post("/category/register", protectRouteAdmin, registerCategoryByAdmin);

export default router;
