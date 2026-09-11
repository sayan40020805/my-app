"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearSession, getSession } from "../lib/api";

export default function Navbar() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  useEffect(() => setSession(getSession()), []);
  return (
    <nav className="navbar"><div className="nav-inner">
      <Link className="brand" href="/">StaySimple</Link>
      <div className="nav-links">
        <Link href="/hotels">Hotels</Link>
        {session?.user?.role === "user" && <Link href="/user/dashboard">Dashboard</Link>}
        {session?.user?.role === "hotel" && <Link href="/hotel/dashboard">Dashboard</Link>}
        {session ? <button className="button small" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); clearSession(); router.push("/"); }}>Logout</button> : <Link href="/login">Login</Link>}
      </div>
    </div></nav>
  );
}
