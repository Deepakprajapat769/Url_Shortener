import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String },
  ipAddress: { type: String },
  location: { type: Object },
});

export default mongoose.model("Analytics", AnalyticsSchema);
