"use client";
import { useEffect, useState } from "react"; import HotelCard from "../../components/HotelCard"; import { api } from "../../lib/api";
export default function Hotels() { const [hotels, setHotels] = useState([]); const [query, setQuery] = useState(""); const [error, setError] = useState("");
  useEffect(() => { api("/hotels").then(setHotels).catch(e => setError(e.message)); }, []);
  const shown = hotels.filter(h => `${h.name} ${h.location}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="container"><div className="toolbar"><div><h2>Browse Hotels</h2><p className="muted">Find your next comfortable stay.</p></div><input placeholder="Search name or location" value={query} onChange={e => setQuery(e.target.value)} /></div>{error && <p className="error">{error}</p>}<div className="grid">{shown.map(h => <HotelCard key={h._id} hotel={h} />)}</div>{!error && !shown.length && <p className="muted">No hotels found yet.</p>}</main>;
}
