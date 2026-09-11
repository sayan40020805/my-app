import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/db";
import Booking from "../../../../../models/Booking";
import Hotel from "../../../../../models/Hotel";
import { requireRole } from "../../../../../lib/auth";
export async function PUT(request, { params }) {
  const user = await requireRole("hotel"); if (!user) return NextResponse.json({ message: "Hotel login required" }, { status: 401 });
  const { status } = await request.json(); if (!["accepted", "rejected"].includes(status)) return NextResponse.json({ message: "Status must be accepted or rejected" }, { status: 400 });
  await connectDB(); const hotel = await Hotel.findOne({ owner: user.id }); const { id } = await params;
  const booking = await Booking.findOneAndUpdate({ _id: id, hotel: hotel?._id }, { status }, { new: true });
  if (!booking) return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  return NextResponse.json(booking);
}
