import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
