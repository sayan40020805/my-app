"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, saveSession } from "../../lib/api";
export default function Login() {
  const router = useRouter(); const [form, setForm] = useState({ email: "", password: "" }); const [error, setError] = useState("");
  async function submit(e) { e.preventDefault(); setError(""); try { const data = await api("/auth/login", { method: "POST", body: JSON.stringify(form) }); saveSession(data); router.push(data.user.role === "hotel" ? "/hotel/dashboard" : "/user/dashboard"); } catch (err) { setError(err.message); } }
  return <main className="container"><form className="form-card" onSubmit={submit}><h2>Login</h2><label>Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>{error && <p className="error">{error}</p>}<button className="button">Login</button><p className="muted">New here? <Link href="/register">Create an account</Link></p></form></main>;
}
