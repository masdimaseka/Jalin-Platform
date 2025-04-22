import express from "express";
import { protectRouteAdmin } from "../middleware/auth.middleware.js";
import {
  getPointProduct,
  getPointProductById,
  registerPointProduct,
} from "../controllers/pointProduct.controller.js";

const router = express.Router();

router.get("/", getPointProduct);
router.post("/register", protectRouteAdmin, registerPointProduct);
router.get("/:id", getPointProductById);

export default router;
