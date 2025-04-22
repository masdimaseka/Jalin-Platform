import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  callbackPayment,
  createTransaksiPoint,
} from "../controllers/transaksiPoint.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createTransaksiPoint);
router.post("/callback/midtrans", protectRoute, callbackPayment);

export default router;
