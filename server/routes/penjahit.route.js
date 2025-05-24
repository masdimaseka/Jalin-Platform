import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getPenjahit,
  getPenjahitById,
  getPenjahitByIdUser,
  getPenjahitPremium,
} from "../controllers/penjahit/get.penjahit.controller.js";
import { registerPenjahit } from "../controllers/penjahit/create.penjahit.controller.js";
import {
  updateProfilePenjahit,
  updateStatusPenjahit,
} from "../controllers/penjahit/update.penjahit.controller.js";

const router = express.Router();

router.get("/", getPenjahit);
router.get("/premium", getPenjahitPremium);
router.post("/register", protectRoute, registerPenjahit);
router.get("/user/:id", getPenjahitByIdUser);
router.put("/update/status/:id", protectRoute, updateStatusPenjahit);
router.put("/update/:id", protectRoute, updateProfilePenjahit);
router.get("/:id", getPenjahitById);

export default router;
