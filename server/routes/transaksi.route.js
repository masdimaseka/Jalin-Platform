import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptTransaksiPenjahit,
  createTransaksi,
  createTransaksiToPenjahit,
  getTransaksi,
  getTransaksiById,
  getTransaksiPenjahit,
  getTransaksiPenjahitWaiting,
} from "../controllers/transaksi.controller.js";

const router = express.Router();

router.get("/", getTransaksi);
router.get("/penjahit/:id", protectRoute, getTransaksiPenjahit);
router.get("/penjahit/:id/waiting", protectRoute, getTransaksiPenjahitWaiting);
router.post("/create", protectRoute, createTransaksi);
router.post("/create/:id", protectRoute, createTransaksiToPenjahit);
router.put("/accept/:id", protectRoute, acceptTransaksiPenjahit);
router.get("/:id", getTransaksiById);

export default router;
