import express from "express";
import {
  getUrlAnalytics,
  getTopicAnalytics,
  getOverallAnalytics,
} from "../controllers/analyticsController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/analytics/overall/",authenticateUser, getOverallAnalytics); // Overall analytics
router.get("/analytics/:alias",authenticateUser, getUrlAnalytics);
router.get("/analytics/topic/:topic", authenticateUser,getTopicAnalytics); // Topic-based analytics

export default router;
