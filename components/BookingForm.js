"use client";
import { useState } from "react";
import { api } from "../lib/api";

export default function BookingForm({ room, onDone }) {
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setError("");
    try { await api("/bookings", { method: "POST", body: JSON.stringify({ ...form, room: room._id, hotel: room.hotel }) }); onDone("Booking request sent."); }
    catch (err) { setError(err.message); }
  }
  return <form onSubmit={submit} className="form-card">
    <h3>Request {room.type}</h3><label>Check-in<input required type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} /></label>
    <label>Check-out<input required type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} /></label>
    <label>Guests<input required min="1" type="number" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} /></label>
    {error && <p className="error">{error}</p>}<button className="button">Submit Request</button>
  </form>;
}
