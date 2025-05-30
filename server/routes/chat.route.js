import express from "express";
import {
  protectRoute,
  protectRouteAdmin,
} from "../middleware/auth.middleware.js";
import {
  getStreamToken,
  regisUserToStream,
} from "../controllers/chat.controller.js";
const router = express.Router();

router.get("/token", protectRoute, getStreamToken);
router.post("/regis-to-stream", protectRouteAdmin, regisUserToStream);

export default router;
