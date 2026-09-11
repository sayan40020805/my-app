import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Hotel Booking System",
  description: "A simple hotel booking request app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
