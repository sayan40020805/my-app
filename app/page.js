import Link from "next/link";

export default function Home() {
  return (
    <main className="hero">
      <div className="hero-card">
        <p className="eyebrow">Simple stays, easier planning</p>
        <h1>Hotel Booking System</h1>
        <p className="hero-copy">
          Find a comfortable room, send a booking request, and manage your
          stay in one simple place.
        </p>
        <div className="actions">
          <Link className="button" href="/login">Login</Link>
          <Link className="button secondary" href="/register">Register</Link>
          <Link className="button text-button" href="/hotels">Browse Hotels</Link>
        </div>
      </div>
    </main>
  );
}
