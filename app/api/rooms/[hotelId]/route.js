import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Room from "../../../../models/Room";
export async function GET(_, { params }) {
  await connectDB();
  const { hotelId } = await params;
  return NextResponse.json(await Room.find({ hotel: hotelId }));
}
