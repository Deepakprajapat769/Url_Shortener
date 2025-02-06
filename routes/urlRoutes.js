import express from "express";
import { createShortUrl,  } from "../controllers/urlController.js";
import {authenticateUser}  from "../middlewares/authMiddleware.js";
import { shortUrlLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/shorten", authenticateUser, shortUrlLimiter, createShortUrl);

export default router;
