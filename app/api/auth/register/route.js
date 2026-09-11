import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import Hotel from "../../../../models/Hotel";
import connectDB from "../../../../lib/db";
import { authCookie, signToken } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    if (!name || !email || !password || !["user", "hotel"].includes(role)) return NextResponse.json({ message: "Name, email, password, and a valid role are required" }, { status: 400 });
    await connectDB();
    const normalized = email.toLowerCase();
    if (await User.findOne({ email: normalized })) return NextResponse.json({ message: "Email is already registered" }, { status: 409 });
    const user = await User.create({ name, email: normalized, password: await bcrypt.hash(password, 10), role });
    if (role === "hotel") await Hotel.create({ owner: user._id, name, location: "Add your location", email: normalized });
    const data = { user: { id: user._id, name: user.name, email: user.email, role: user.role } };
    const response = NextResponse.json(data, { status: 201 });
    response.cookies.set(authCookie(signToken(user)));
    return response;
  } catch (error) { return NextResponse.json({ message: error.message || "Registration failed" }, { status: 500 }); }
}
