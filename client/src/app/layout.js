import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { CartProvider } from "./context/CartContext";
import LayoutShell from "@/components/LayoutShell";
import { SessionProvider } from "next-auth/react";



export const metadata = {
  title: "CADHub | AutoCAD Drawings, Plans & 3D Models",
  description: "A professional platform to download free and premium AutoCAD drawings, architectural plans, and engineering designs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <CartProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
