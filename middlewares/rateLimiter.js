import rateLimit from "express-rate-limit";

export const shortUrlLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each user to 5 requests per 10 minutes
  message: "Too many requests, please try again later.",
});
