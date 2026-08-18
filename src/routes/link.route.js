import { Router } from "express";
import { createLink } from "../controllers/link.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/links", createLink);

export default router;
