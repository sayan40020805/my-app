import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Booking from "../../../models/Booking";
import Room from "../../../models/Room";
import { requireRole } from "../../../lib/auth";
export async function POST(request) {
  const user = await requireRole("user"); if (!user) return NextResponse.json({ message: "User login required" }, { status: 401 });
  const { hotel, room, checkIn, checkOut, guests } = await request.json();
  if (!hotel || !room || !checkIn || !checkOut || !guests || new Date(checkOut) <= new Date(checkIn)) return NextResponse.json({ message: "Valid booking details are required" }, { status: 400 });
  await connectDB(); if (!await Room.findOne({ _id: room, hotel })) return NextResponse.json({ message: "Room does not belong to this hotel" }, { status: 400 });
  return NextResponse.json(await Booking.create({ user: user.id, hotel, room, checkIn, checkOut, guests }), { status: 201 });
}
