import express from "express";
import { protectRouteAdmin } from "../middleware/auth.middleware.js";
import { registerCategory } from "../controllers/category.controller.js";
import { getCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategory);
router.post("/register", protectRouteAdmin, registerCategory);

export default router;
