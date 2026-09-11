"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HotelCard from "../../../components/HotelCard";
import { api, getSession } from "../../../lib/api";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]); const [hotels, setHotels] = useState([]); const [error, setError] = useState(""); const [session, setSession] = useState(null); const [ready, setReady] = useState(false);
  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
    setReady(true);
    api("/hotels").then(setHotels).catch(e => setError(e.message));
    if (currentSession?.user?.role === "user") api("/bookings/my").then(setBookings).catch(e => setError(e.message));
  }, []);
  if (!ready) return <main className="container"><p className="muted">Loading dashboard...</p></main>;
  if (!session || session.user?.role !== "user") return <main className="container"><p className="error">Please login as a user to view this page.</p><Link className="button" href="/login">Login</Link></main>;
  return <main className="container"><div className="toolbar"><div><h2>Welcome, {session.user.name}</h2><p className="muted">Find a hotel and track your booking requests here.</p></div><Link className="button" href="/hotels">Browse Hotels</Link></div>{error && <p className="error">{error}</p>}<section><div className="toolbar"><h2>Registered Hotels</h2></div>{hotels.length ? <div className="grid">{hotels.map(h => <HotelCard key={h._id} hotel={h} />)}</div> : <p className="muted">No hotels have been registered yet.</p>}</section><section className="panel" style={{ marginTop: 20 }}><h2>My Booking Requests</h2>{bookings.length ? bookings.map(b => <div className="booking-row" key={b._id}><div><strong>{b.hotel?.name || "Hotel"}</strong><br />{b.room?.type || "Room"} · {b.checkIn?.slice(0, 10)} to {b.checkOut?.slice(0, 10)} · {b.guests} guest(s)</div><span className={`status ${b.status}`}>{b.status}</span></div>) : <p className="muted">You have not sent any booking requests yet.</p>}</section></main>;
}
