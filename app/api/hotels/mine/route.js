import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Hotel from "../../../../models/Hotel";
import Room from "../../../../models/Room";
import { requireRole } from "../../../../lib/auth";
export async function GET() {
  const user = await requireRole("hotel"); if (!user) return NextResponse.json({ message: "Hotel login required" }, { status: 401 });
  await connectDB(); const hotel = await Hotel.findOne({ owner: user.id });
  if (!hotel) return NextResponse.json({ message: "Hotel profile not found" }, { status: 404 });
  return NextResponse.json({ ...hotel.toObject(), rooms: await Room.find({ hotel: hotel._id }) });
}
