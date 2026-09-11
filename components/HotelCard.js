import Link from "next/link";

export default function HotelCard({ hotel }) {
  return <article className="card">
    <p className="eyebrow">Hotel</p><h3>{hotel.name}</h3>
    <p><strong>{hotel.location}</strong></p><p className="muted">{hotel.description || "A welcoming place to stay."}</p>
    <Link className="button" href={`/hotels/${hotel._id}`}>View Hotel</Link>
  </article>;
}
