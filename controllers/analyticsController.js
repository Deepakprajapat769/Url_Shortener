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
    const cachedData = await redisClient.get(`analytics:${alias}`);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    const analytics = await Analytics.find({ shortUrl: alias });

    if (!analytics.length)
      return res.status(404).json({ message: "No analytics found" });

    const result = {
      totalClicks: analytics.length,
      uniqueUsers: new Set(analytics.map((a) => a.ipAddress)).size,
      clicksByDate: calculateClicksByDate(analytics),
      ...calculateOsAndDeviceAnalytics(analytics),
    };

    await redisClient.setEx(
      `analytics:${alias}`,
      120,
      JSON.stringify({ status: 201, message: "ok", result: result })
    );

    res.status(201).json({
      status: 201,
      message: "ok",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get analytics for a specific topic
export const getTopicAnalytics = async (req, res) => {
  try {
    const { topic } = req.params;

    const cachedData = await redisClient.get(`topicAnalytics:${topic}`);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    const urls = await Url.find({ topic });
    if (!urls.length)
      return res.status(404).json({ message: "No URLs found for this topic" });

    const shortUrls = urls.map((url) => url.shortUrl);
    const analytics = await Analytics.find({ shortUrl: { $in: shortUrls } });

    const result = {
      totalClicks: analytics.length,
      uniqueUsers: new Set(analytics.map((a) => a.ipAddress)).size,
      clicksByDate: calculateClicksByDate(analytics),
      urls: shortUrls.map((shortUrl) => ({
        shortUrl,
        totalClicks: analytics.filter((a) => a.shortUrl === shortUrl).length,
        uniqueUsers: new Set(
          analytics
            .filter((a) => a.shortUrl === shortUrl)
            .map((a) => a.ipAddress)
        ).size,
      })),
    };

    await redisClient.setEx(
      `topicAnalytics:${topic}`,
      120, // 2 minite
      JSON.stringify({ status: 201, message: "ok", result: result })
    );

    res.status(201).json({
      status: 201,
      message: "ok",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get overall analytics for all URLs created by the authenticated user
export const getOverallAnalytics = async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);
    const cachedData = await redisClient.get(`overall:${userId}`);
    if (cachedData) return res.json(JSON.parse(cachedData));
    const urls = await Url.find({ createdBy: userId });
    if (!urls.length)
      return res.status(404).json({ message: "No URLs found for this user" });

    const shortUrls = urls.map((url) => url.shortUrl);
    const analytics = await Analytics.find({ shortUrl: { $in: shortUrls } });

    const result = {
      totalUrls: urls.length,
      totalClicks: analytics.length,
      uniqueUsers: new Set(analytics.map((a) => a.ipAddress)).size,
      clicksByDate: calculateClicksByDate(analytics),
      ...calculateOsAndDeviceAnalytics(analytics),
    };
    await redisClient.setEx(
      `overall:${userId}`,
      120, // 2 minite
      JSON.stringify({ status: 201, message: "ok", result: result })
    );
    res.status(201).json({
      status: 201,
      message: "ok",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
