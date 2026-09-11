"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, getSession } from "../../../lib/api";

export default function HotelDashboard() {
  const [session, setSession] = useState(null); const [ready, setReady] = useState(false); const [hotel, setHotel] = useState(null); const [bookings, setBookings] = useState([]); const [error, setError] = useState(""); const [saved, setSaved] = useState(""); const [saving, setSaving] = useState(false); const [room, setRoom] = useState({ type: "", price: "", totalRooms: 1 });
  async function load() { try { const [profile, requests] = await Promise.all([api("/hotels/mine"), api("/bookings/hotel")]); setHotel(profile); setBookings(requests); } catch (e) { setError(e.message); } }
  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
    setReady(true);
    if (currentSession?.user?.role === "hotel") load();
  }, []);
  async function updateProfile(e) {
    e.preventDefault();
    setError("");
    setSaved("");
    setSaving(true);
    try {
      const profile = { name: hotel.name, location: hotel.location, description: hotel.description, phone: hotel.phone, email: hotel.email };
      const updated = await api(`/hotels/${hotel._id}`, { method: "PUT", body: JSON.stringify(profile) });
      setHotel({ ...hotel, ...updated });
      setSaved("Profile saved successfully.");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }
  async function addRoom(e) { e.preventDefault(); try { await api("/rooms", { method: "POST", body: JSON.stringify(room) }); setRoom({ type: "", price: "", totalRooms: 1 }); load(); } catch (e) { setError(e.message); } }
  async function setStatus(id, status) { try { await api(`/bookings/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }); load(); } catch (e) { setError(e.message); } }
  if (!ready) return <main className="container"><p className="muted">Loading dashboard...</p></main>;
  if (!session || session.user?.role !== "hotel") return <main className="container"><p className="error">Please login as a hotel to view this page.</p><Link className="button" href="/login">Login</Link></main>;
  if (!hotel) return <main className="container"><p className="muted">{error || "Loading dashboard..."}</p></main>;
  return <main className="container"><h2>Hotel Dashboard</h2>{error && <p className="error">{error}</p>}{saved && <p className="status accepted">{saved}</p>}<div className="split"><form className="panel" onSubmit={updateProfile}><h3>Hotel profile</h3><label>Hotel name<input required value={hotel.name || ""} onChange={e => setHotel({ ...hotel, name: e.target.value })} /></label><label>Location<input required value={hotel.location || ""} onChange={e => setHotel({ ...hotel, location: e.target.value })} /></label><label>Description<textarea value={hotel.description || ""} onChange={e => setHotel({ ...hotel, description: e.target.value })} /></label><label>Phone<input value={hotel.phone || ""} onChange={e => setHotel({ ...hotel, phone: e.target.value })} /></label><label>Contact email<input type="email" value={hotel.email || ""} onChange={e => setHotel({ ...hotel, email: e.target.value })} /></label><button className="button" disabled={saving}>{saving ? "Saving..." : "Save profile"}</button></form><form className="panel" onSubmit={addRoom}><h3>Add a room</h3><label>Room type<input required placeholder="Standard room" value={room.type} onChange={e => setRoom({ ...room, type: e.target.value })} /></label><label>Price per night<input required min="0" type="number" value={room.price} onChange={e => setRoom({ ...room, price: e.target.value })} /></label><label>Number of rooms<input required min="1" type="number" value={room.totalRooms} onChange={e => setRoom({ ...room, totalRooms: e.target.value })} /></label><button className="button">Add room</button><h3>Existing rooms</h3>{hotel.rooms?.map(r => <p className="room-row" key={r._id}>{r.type} — ${r.price}/night ({r.totalRooms})</p>)}</form></div><section className="panel" style={{ marginTop: 20 }}><h3>Booking requests received</h3>{bookings.length ? bookings.map(b => <div className="booking-row" key={b._id}><div><strong>{b.user?.name}</strong> ({b.user?.email})<br />{b.room?.type} · {b.checkIn?.slice(0, 10)} to {b.checkOut?.slice(0, 10)} · {b.guests} guest(s)</div><div className="button-row">{b.status === "pending" && <><button className="button small" onClick={() => setStatus(b._id, "accepted")}>Accept</button><button className="button small danger" onClick={() => setStatus(b._id, "rejected")}>Reject</button></>}<span className={`status ${b.status}`}>{b.status}</span></div></div>) : <p className="muted">No booking requests yet.</p>}</section></main>;
}
