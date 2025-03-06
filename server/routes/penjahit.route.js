import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPenjahit,
  registerPenjahit,
} from "../controllers/penjahit.controller.js";

const router = express.Router();

router.get("/", protectRoute, getPenjahit);
router.post("/register", protectRoute, registerPenjahit);

export default router;
