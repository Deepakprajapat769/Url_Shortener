import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api", urlRoutes);
app.use("/api", analyticsRoutes);

const PORT = process.env.APPLICATION_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

