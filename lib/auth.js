import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function signToken(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function currentUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  try { return jwt.verify(token, process.env.JWT_SECRET); } catch { return null; }
}

export async function requireRole(role) {
  const user = await currentUser();
  if (!user || (role && user.role !== role)) return null;
  return user;
}

export function authCookie(token) {
  return { name: "token", value: token, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" };
}
