import { Router } from "express";
import {
  createLink,
  deleteLink,
  getMyLinks,
  redirectLinks,
} from "../controllers/link.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/links:
 *   post:
 *     summary: Create a shortened link
 *     tags: [Links]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - original_url
 *             properties:
 *               original_url:
 *                 type: string
 *                 example: https://google.com
 *               slug:
 *                 type: string
 *                 example: google
 *     responses:
 *       201:
 *         description: Link created successfully
 *       400:
 *         description: Invalid slug
 *       409:
 *         description: Slug already exists
 */
router.post("/links", authMiddleware, createLink);

/**
 * @swagger
 * /api/links:
 *   get:
 *     summary: Get user's links
 *     tags: [Links]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by slug or original URL
 *     responses:
 *       200:
 *         description: User links retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/links", authMiddleware, getMyLinks);

/**
 * @swagger
 * /{slug}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [Links]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       301:
 *         description: Permanent redirect
 *       404:
 *         description: Link not found
 */
router.get("/:slug", redirectLinks);

/**
 * @swagger
 * /api/links/{id}:
 *   delete:
 *     summary: Delete a link
 *     tags: [Links]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Link deleted successfully
 *       403:
 *         description: Not allowed to delete this link
 *       404:
 *         description: Link not found
 */
router.delete("/links/:id", authMiddleware, deleteLink);

export default router;
