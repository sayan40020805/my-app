import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Booking from "../../../../models/Booking";
import { requireRole } from "../../../../lib/auth";
export async function GET() {
  const user = await requireRole("user"); if (!user) return NextResponse.json({ message: "User login required" }, { status: 401 });
  await connectDB();
  return NextResponse.json(await Booking.find({ user: user.id }).populate("hotel", "name location").populate("room", "type price").sort({ createdAt: -1 }));
}
