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

