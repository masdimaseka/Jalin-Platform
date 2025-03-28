import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUserById,
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUsers);
router.get("/user/:id", protectRoute, getUserById);
router.put("/user/:id", protectRoute, updateProfile);

export default router;
