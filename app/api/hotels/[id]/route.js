import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Hotel from "../../../../models/Hotel";
import Room from "../../../../models/Room";
import { requireRole } from "../../../../lib/auth";

export async function GET(_, { params }) {
  await connectDB(); const { id } = await params;
  const hotel = await Hotel.findById(id);
  if (!hotel) return NextResponse.json({ message: "Hotel not found" }, { status: 404 });
  return NextResponse.json({ ...hotel.toObject(), rooms: await Room.find({ hotel: id }) });
}
export async function PUT(request, { params }) {
  const user = await requireRole("hotel"); if (!user) return NextResponse.json({ message: "Hotel login required" }, { status: 401 });
  await connectDB(); const { id } = await params; const body = await request.json();
  const updates = {
    name: body.name,
    location: body.location,
    description: body.description,
    phone: body.phone,
    email: body.email
  };
  const hotel = await Hotel.findOneAndUpdate({ _id: id, owner: user.id }, updates, { new: true, runValidators: true });
  if (!hotel) return NextResponse.json({ message: "Hotel profile not found" }, { status: 404 });
  return NextResponse.json(hotel);
}
