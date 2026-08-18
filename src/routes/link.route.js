import { Router } from "express";
import {
  createLink,
  deleteLink,
  getMyLinks,
  redirectLinks,
} from "../controllers/link.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/links", authMiddleware, createLink);
router.get("/links", authMiddleware, getMyLinks);
router.get("/:slug", redirectLinks);
router.delete("/links/:id", authMiddleware, deleteLink);

export default router;
