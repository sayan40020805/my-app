import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Hotel from "../../../models/Hotel";
import Room from "../../../models/Room";
import { requireRole } from "../../../lib/auth";
export async function GET(request) {
  const hotelId = new URL(request.url).searchParams.get("hotelId");
  if (!hotelId) return NextResponse.json({ message: "hotelId is required" }, { status: 400 });
  await connectDB();
  return NextResponse.json(await Room.find({ hotel: hotelId }).sort({ createdAt: -1 }));
}
export async function POST(request) {
  const user = await requireRole("hotel"); if (!user) return NextResponse.json({ message: "Hotel login required" }, { status: 401 });
  await connectDB(); const hotel = await Hotel.findOne({ owner: user.id }); if (!hotel) return NextResponse.json({ message: "Hotel profile not found" }, { status: 404 });
  const { type, price, totalRooms } = await request.json();
  if (!type || price === undefined || !totalRooms) return NextResponse.json({ message: "Room type, price, and number of rooms are required" }, { status: 400 });
  return NextResponse.json(await Room.create({ hotel: hotel._id, type, price, totalRooms }), { status: 201 });
}
