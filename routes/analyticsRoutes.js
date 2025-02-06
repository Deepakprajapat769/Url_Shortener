import express from "express";
import {
  getUrlAnalytics,
  getTopicAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/analytics/:alias", getUrlAnalytics);
router.get("/analytics/topic/:topic", getTopicAnalytics); // Topic-based analytics

export default router;
