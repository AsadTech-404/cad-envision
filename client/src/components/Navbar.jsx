"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { cartItems } = useCart();

  const [openProfile, setOpenProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/drawings?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 w-full z-50 bg-blueprint-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-xs">
          {/* Left */}
          <div className="flex gap-4 text-gray-400">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <Link href="/contact" className="hover:text-white">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>

          {/* Right Logo */}
          <Link href="/" className="font-bold text-white tracking-tight">
            CAD<span className="text-blueprint-500"> ENVISION</span>
          </Link>
        </div>
      </div>

      {/* ================= MAIN BAR ================= */}
      <div className="fixed top-8 w-full z-40 bg-blueprint-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search drawings..."
              className="bg-blueprint-700 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white w-48 lg:w-64 focus:outline-none focus:border-blueprint-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5 text-gray-400 hover:text-white" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 text-[10px] flex items-center justify-center bg-blueprint-500 text-white rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth */}
            {!session ? (
              <Link href="/login" className="p-2">
                <User className="w-5 h-5 text-gray-400 hover:text-white" />
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="w-9 h-9 rounded-full bg-blueprint-500 text-white font-bold"
                >
                  {session.user.name.charAt(0).toUpperCase()}
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-2 w-40 bg-blueprint-900 border border-white/10 rounded-lg">
                    <p className="px-4 py-2 text-sm text-gray-300">
                      {session.user.name}
                    </p>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="fixed top-24 w-full z-30 bg-blueprint-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-6 overflow-x-auto text-sm text-gray-400">
          {[
            "Drawings",
            "HVAC Design",
            "Fire Protection",
            "Plumbing",
            "BIM",
            "Revit Families",
            "AutoCad Blocks",
            "Blogs",
          ].map((item) => (
            <Link
              key={item}
              href={`/categories/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="whitespace-nowrap hover:text-white transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
