import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createTransaksi,
  createTransaksiToPenjahit,
  getTransaksi,
  getTransaksiPenjahit,
  getTransaksiPenjahitWaiting,
} from "../controllers/transaksi.controller.js";

const router = express.Router();

router.get("/", protectRoute, getTransaksi);
router.get("/penjahit/:id", protectRoute, getTransaksiPenjahit);
router.get("/penjahit/:id/waiting", protectRoute, getTransaksiPenjahitWaiting);
router.post("/create", protectRoute, createTransaksi);
router.post("/create/:id", protectRoute, createTransaksiToPenjahit);

export default router;
