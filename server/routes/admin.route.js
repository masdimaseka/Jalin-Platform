import express from "express";
import { protectRouteAdmin } from "../middleware/auth.middleware.js";
import {
  checkAuthAdmin,
  deleteCategoryByAdmin,
  getCategoryByAdmin,
  getTransaksiByAdmin,
  getTransaksiByIdByAdmin,
  getTransaksiPointByAdmin,
  loginAdmin,
  logoutAdmin,
  registerCategoryByAdmin,
} from "../controllers/admin/admin.controller.js";
import {
  deleteUserByIdByAdmin,
  getUserByAdmin,
  getUserByIdByAdmin,
} from "../controllers/admin/admin.user.controller.js";
import {
  deletePenjahitByIdByAdmin,
  getPenjahitByAdmin,
  getPenjahitByIdByAdmin,
  setPenjahitPremium,
  verifyPenjahit,
} from "../controllers/admin/admin.penjahit.controller.js";

const router = express.Router();

router.get("/check-admin", protectRouteAdmin, checkAuthAdmin);

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/penjahit", protectRouteAdmin, getPenjahitByAdmin);
router.post("/penjahit/verify/:id", protectRouteAdmin, verifyPenjahit);
router.put("/penjahit/premium/:id", protectRouteAdmin, setPenjahitPremium);
router.get("/penjahit/:id", protectRouteAdmin, getPenjahitByIdByAdmin);
router.delete("/penjahit/:id", protectRouteAdmin, deletePenjahitByIdByAdmin);

router.get("/user", protectRouteAdmin, getUserByAdmin);
router.get("/user/:id", protectRouteAdmin, getUserByIdByAdmin);
router.delete("/user/:id", protectRouteAdmin, deleteUserByIdByAdmin);

router.get("/category", protectRouteAdmin, getCategoryByAdmin);
router.post("/category/register", protectRouteAdmin, registerCategoryByAdmin);
router.delete("/category/:id", protectRouteAdmin, deleteCategoryByAdmin);

router.get("/transaksi-point", protectRouteAdmin, getTransaksiPointByAdmin);

router.get("/transaksi", protectRouteAdmin, getTransaksiByAdmin);
router.get("/transaksi/:id", protectRouteAdmin, getTransaksiByIdByAdmin);

export default router;
