import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUserById,
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/:id", protectRoute, getUserById);
router.put("/update/:id", protectRoute, updateProfile);

export default router;
