import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPenjahit,
  getPenjahitById,
  registerPenjahit,
} from "../controllers/penjahit.controller.js";

const router = express.Router();

router.get("/", getPenjahit);
router.get("/:id", getPenjahitById);
router.post("/register", protectRoute, registerPenjahit);

export default router;
