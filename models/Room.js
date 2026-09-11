import mongoose from "mongoose";
const schema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  type: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  totalRooms: { type: Number, required: true, min: 1 }
}, { timestamps: true });
export default mongoose.models.Room || mongoose.model("Room", schema);
