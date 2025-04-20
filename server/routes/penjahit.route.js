import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPenjahit,
  getPenjahitById,
  getPenjahitByIdUser,
  getPenjahitPremium,
  registerPenjahit,
  updateStatusPenjahit,
} from "../controllers/penjahit.controller.js";

const router = express.Router();

router.get("/", getPenjahit);
router.get("/premium", getPenjahitPremium);
router.post("/register", protectRoute, registerPenjahit);
router.get("/user/:id", getPenjahitByIdUser);
router.put("/update/status/:id", protectRoute, updateStatusPenjahit);
router.get("/:id", getPenjahitById);

export default router;
