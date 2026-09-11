export function getSession() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem("session") || "null"); } catch { return null; }
}
export function saveSession(data) {
  localStorage.setItem("session", JSON.stringify({ user: data.user }));
}
export function clearSession() { localStorage.removeItem("session"); }
export async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}
