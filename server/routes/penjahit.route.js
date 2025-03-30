import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPenjahit,
  getPenjahitById,
  getPenjahitByIdUser,
  registerPenjahit,
} from "../controllers/penjahit.controller.js";

const router = express.Router();

router.get("/", getPenjahit);
router.get("/:id", getPenjahitById);
router.get("/user/:id", getPenjahitByIdUser);
router.post("/register", protectRoute, registerPenjahit);

export default router;
