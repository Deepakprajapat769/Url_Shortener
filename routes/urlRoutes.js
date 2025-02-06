import express from "express";
import { createShortUrl, redirectShortUrl } from "../controllers/urlController.js";
import {authenticateUser}  from "../middlewares/authMiddleware.js";
import { shortUrlLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/shorten", authenticateUser, shortUrlLimiter, createShortUrl);
router.get("/shorten/:alias", redirectShortUrl); // Redirect API

export default router;
