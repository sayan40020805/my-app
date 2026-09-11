import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkIn: { type: Date, required: true }, checkOut: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });
export default mongoose.models.Booking || mongoose.model("Booking", schema);
