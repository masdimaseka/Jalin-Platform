import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { registerCategory } from "../controllers/category.controller.js";
import { getCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategory);
router.post("/register", protectRoute, registerCategory);

export default router;
