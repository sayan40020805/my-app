import { NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Hotel from "../../../models/Hotel";
import { requireRole } from "../../../lib/auth";

export async function GET(request) {
  await connectDB();
  const search = new URL(request.url).searchParams.get("search");
  const query = search ? { $or: [{ name: new RegExp(search, "i") }, { location: new RegExp(search, "i") }] } : {};
  return NextResponse.json(await Hotel.find(query).sort({ createdAt: -1 }));
}
export async function POST(request) {
  const user = await requireRole("hotel");
  if (!user) return NextResponse.json({ message: "Hotel login required" }, { status: 401 });
  await connectDB();
  return NextResponse.json(await Hotel.create({ ...(await request.json()), owner: user.id }), { status: 201 });
}
