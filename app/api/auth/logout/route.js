import { NextResponse } from "next/server";
export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    maxAge: 0,
    path: "/"
  });
  return response;
}
