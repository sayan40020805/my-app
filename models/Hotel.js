import mongoose from "mongoose";
const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, default: "" }, phone: { type: String, default: "" },
  email: { type: String, required: true, lowercase: true, trim: true }
}, { timestamps: true });
export default mongoose.models.Hotel || mongoose.model("Hotel", schema);
