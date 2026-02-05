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
  const [openProfile, setOpenProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { cartItems } = useCart();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/drawings?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* --- TOP BAR: Corporate Links --- */}
      <div className="bg-blueprint-950 border-b border-white/5 py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-widest">
          {/* Left: Legal/About */}
          <div className="flex gap-4 md:gap-6 text-gray-400">
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          </div>
          {/* Right: Secondary Logo */}
          <div className="text-white font-bold opacity-60">
            CAD ENVISION
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR: Main Navigation & Tools --- */}
      <div className="bg-blueprint-900/90 backdrop-blur-md border-b border-white/10 px-6 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          
          {/* Main Logo & Category Links (Hidden on Mobile) */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white shrink-0">
              CAD<span className="text-blueprint-500"> Envision</span>
            </Link>

            <div className="hidden xl:flex gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
              <Link href="/drawings" className="hover:text-blueprint-400 transition">Drawings</Link>
              <Link href="/drawings?category=hvac" className="hover:text-blueprint-400 transition whitespace-nowrap">HVAC Design</Link>
              <Link href="/drawings?category=fire-protection" className="hover:text-blueprint-400 transition whitespace-nowrap">Fire Protection</Link>
              <Link href="/drawings?category=plumbing" className="hover:text-blueprint-400 transition">Plumbing</Link>
              <Link href="/drawings?category=bim" className="hover:text-blueprint-400 transition">BIM</Link>
              <Link href="/drawings?category=revit" className="hover:text-blueprint-400 transition whitespace-nowrap">Revit Families</Link>
              <Link href="/drawings?category=autocad" className="hover:text-blueprint-400 transition whitespace-nowrap">AutoCAD Blocks</Link>
              <Link href="/blog" className="hover:text-blueprint-400 transition">Blogs</Link>
            </div>
          </div>

          {/* Right Side Tools */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search..."
                className="bg-blueprint-800 border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:border-blueprint-500 transition w-32 xl:w-48 text-white"
              />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5 text-gray-400 hover:text-white transition" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-blueprint-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            {!session ? (
              <Link href="/login" className="p-2 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400 hover:text-white transition" />
                <span className="hidden sm:inline text-xs font-bold text-gray-400">LOGIN</span>
              </Link>
            ) : (
              <div className="relative">
                <button onClick={() => setOpenProfile(!openProfile)} className="w-8 h-8 rounded-full bg-blueprint-500 text-white font-bold text-xs uppercase">
                  {session.user.name.charAt(0)}
                </button>
                {openProfile && (
                  <div className="absolute right-0 mt-2 bg-blueprint-900 border border-white/10 rounded-lg shadow-xl w-40 overflow-hidden">
                    <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-white/5 font-bold">LOGOUT</button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="xl:hidden text-gray-400 hover:text-white transition" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <div className={`fixed inset-x-0 top-[88px] bg-blueprint-900 border-b border-white/10 transition-all duration-300 xl:hidden z-40 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <div className="px-6 py-8 flex flex-col gap-4 font-bold text-gray-300 uppercase text-sm tracking-widest">
           <Link href="/drawings" onClick={toggleMenu}>Drawings</Link>
           <Link href="/drawings?category=hvac" onClick={toggleMenu}>HVAC Design</Link>
           <Link href="/drawings?category=plumbing" onClick={toggleMenu}>Plumbing</Link>
           <Link href="/drawings?category=bim" onClick={toggleMenu}>BIM</Link>
           <Link href="/blog" onClick={toggleMenu}>Blogs</Link>
        </div>
      </div>
    </nav>
  );
}
