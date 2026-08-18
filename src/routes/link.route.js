import { Router } from "express";
import {
  createLink,
  getMyLinks,
  redirectLinks,
} from "../controllers/link.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/links", authMiddleware, createLink);
router.get("/links", authMiddleware, getMyLinks);
router.get("/:slug", redirectLinks);

export default router;
