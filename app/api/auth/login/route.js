import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import connectDB from "../../../../lib/db";
import { authCookie, signToken } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await connectDB();
    const user = await User.findOne({ email: String(email || "").toLowerCase() });
    if (!user || !(await bcrypt.compare(password || "", user.password))) return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    const response = NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set(authCookie(signToken(user)));
    return response;
  } catch (error) { return NextResponse.json({ message: error.message || "Login failed" }, { status: 500 }); }
}
