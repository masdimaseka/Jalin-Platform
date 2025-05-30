import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getTransaksi,
  getTransaksiById,
  getTransaksiPenjahit,
  getTransaksiPenjahitWaiting,
} from "../controllers/transaksi/get.transaksi.controller.js";
import {
  createTransaksi,
  createTransaksiToPenjahit,
} from "../controllers/transaksi/create.transaksi.controller.js";
import {
  acceptTransaksiPenjahit,
  finishTransaksiPenjahit,
  rejectTransaksiPenjahit,
  reviewTransaksiPenjahit,
} from "../controllers/transaksi/update.transaksi.controller.js";

const router = express.Router();

router.get("/", getTransaksi);
router.get("/penjahit/:id", protectRoute, getTransaksiPenjahit);
router.get("/penjahit/:id/waiting", protectRoute, getTransaksiPenjahitWaiting);
router.post("/create", protectRoute, createTransaksi);
router.post("/create/:id", protectRoute, createTransaksiToPenjahit);
router.put("/accept/:id", protectRoute, acceptTransaksiPenjahit);
router.put("/reject/:id", protectRoute, rejectTransaksiPenjahit);
router.put("/finish/:id", protectRoute, finishTransaksiPenjahit);
router.put("/review/:id", protectRoute, reviewTransaksiPenjahit);
router.get("/:id", getTransaksiById);

export default router;
