import Url from "../models/Url.js";
import Analytics from "../models/Analytics.js";
import redisClient from "../config/redisClient.js"; // Import Redis client
import { getGeoLocation } from "../utilities/geoLocation.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const userId = req.user.id;

  try {
    if (customAlias) {
      const existingAlias = await Url.findOne({ customAlias });
      if (existingAlias)
        return res
          .status(400)
          .json({ status: 400, message: "Custom alias already taken" });
    }
    const shortUrl = customAlias ? customAlias : nanoid(7);
    const newUrl = new Url({
      longUrl,
      shortUrl,
      customAlias,
      topic,
      createdBy: userId,
    });

    await newUrl.save();

    res.status(201).json({
      status: 201,
      message: "ok",
      result: { shortUrl, createdAt: newUrl.createdAt },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Redirect Short URL API
export const redirectShortUrl = async (req, res) => {
  try {
    const { alias } = req.params;
    // Check Redis Cache for Long URL
    const cachedUrl = await redisClient.get(`shortUrl:${alias}`);
    if (cachedUrl) {
      await trackAnalytics(alias, req);
      return res.redirect(cachedUrl);
    }

    // If not cached, fetch from database
    const urlEntry = await Url.findOne({ shortUrl: alias });

    if (!urlEntry) {
      return res
        .status(404)
        .json({ status: 404, message: "Short URL not found" });
    }

    await trackAnalytics(alias, req);

    // Cache result for faster future access
    await redisClient.setEx(`shortUrl:${alias}`, 3600, urlEntry.longUrl); // Cache for 1 hour

    res.redirect(urlEntry.longUrl);
  } catch (error) {
    console.error("Error redirecting short URL:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Helper Function: Track Analytics
const trackAnalytics = async (shortUrl, req) => {
  try {
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const locationData = await getGeoLocation(ipAddress);

    const analyticsEntry = new Analytics({
      shortUrl,
      userAgent,
      ipAddress,
      location: locationData,
    });

    await analyticsEntry.save();
  } catch (error) {
    console.error("Error saving analytics:", error);
  }
};
