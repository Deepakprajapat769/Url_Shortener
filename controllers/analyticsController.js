import redisClient from "../config/redisClient.js";
import Analytics from "../models/Analytics.js";
import Url from "../models/Url.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { calculateClicksByDate } from "../utilities/analyticsData.js";
import { calculateOsAndDeviceAnalytics } from "../utilities/analyticsData.js";

// Get analytics for a specific short URL
export const getUrlAnalytics = async (req, res) => {
  try {
    const { alias } = req.params;
    const analytics = await Analytics.find({ shortUrl: alias });

    if (!analytics.length)
      return res.status(404).json({ message: "No analytics found" });

    res.json({
      totalClicks: analytics.length,
      uniqueUsers: new Set(analytics.map((a) => a.ipAddress)).size,
      clicksByDate: calculateClicksByDate(analytics),
      ...calculateOsAndDeviceAnalytics(analytics),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


