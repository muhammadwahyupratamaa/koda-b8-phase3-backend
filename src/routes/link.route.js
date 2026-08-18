import { Router } from "express";
import { createLink, getMyLinks } from "../controllers/link.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/links", createLink);
router.get("/links", getMyLinks);

export default router;
