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

  // handle search execution
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/drawings?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex flex-col shadow-xl">
      
      {/* =======================
          TOP BAR 
          - Left: Logo
          - Right: About, Contact, Privacy
          - Color: Matches Bottom Bar (blueprint-900)
      ======================== */}
      <div className="bg-blueprint-900 border-b border-white/10 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          
          {/* Left Side: Logo */}
          <Link
            href="/"
            className="text-lg font-bold tracking-tighter text-white"
          >
            CAD<span className="text-blueprint-500"> Envision</span>
          </Link>

          {/* Right Side: Corporate Links (Hidden on Mobile to save space) */}
          <div className="hidden md:flex gap-6 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          </div>

        </div>
      </div>

      {/* =======================
          BOTTOM BAR 
          - Left: Categories (HVAC, Plumbing...)
          - Right: Search, Cart, Login
      ======================== */}
      <div className="bg-blueprint-900/90 backdrop-blur-md border-b border-white/10 w-full z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Left Side: Category Navigation (Hidden on Mobile/Tablet) */}
          <div className="hidden xl:flex items-center gap-5 text-[11px] font-bold text-gray-300 uppercase tracking-tight">
            <Link href="/drawings" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded">Drawings</Link>
            <Link href="/drawings?category=hvac" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded whitespace-nowrap">HVAC Design</Link>
            <Link href="/drawings?category=fire-protection" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded whitespace-nowrap">Fire Protection</Link>
            <Link href="/drawings?category=plumbing" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded">Plumbing</Link>
            <Link href="/drawings?category=bim" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded">BIM</Link>
            <Link href="/drawings?category=revit" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded whitespace-nowrap">Revit Families</Link>
            <Link href="/drawings?category=autocad" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded whitespace-nowrap">AutoCAD Blocks</Link>
            <Link href="/blog" className="hover:text-blueprint-400 transition hover:bg-white/5 px-2 py-1 rounded">Blogs</Link>
          </div>

          {/* Mobile Title (Visible only when links are hidden) */}
          <div className="xl:hidden">
            <Link
            href="/"
            className="text-lg font-bold tracking-tighter text-white"
          >
            CAD<span className="text-blueprint-500"> Envision</span>
          </Link>
          </div>

          {/* Right Side: Tools (Search, Cart, User) */}
          <div className="flex items-center gap-4 relative">
            
            {/* Desktop Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search..."
                className="bg-blueprint-800 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-blueprint-500 transition w-32 lg:w-48 text-white"
              />
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative group p-2">
              <ShoppingCart className="w-5 h-5 text-gray-400 hover:text-white transition" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blueprint-500 text-[10px] font-bold text-white ring-2 ring-blueprint-900 animate-in fade-in zoom-in duration-300">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth / User Profile */}
            {!session ? (
              <Link href="/login" className="p-2">
                <User className="w-5 h-5 text-gray-400 hover:text-white transition" />
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className="w-8 h-8 rounded-full bg-blueprint-500 text-white font-bold flex items-center justify-center text-xs"
                >
                  {session.user.name.charAt(0).toUpperCase()}
                </button>

                {openProfile && (
                  <div className="absolute right-0 mt-2 bg-blueprint-900 border border-white/10 rounded-lg shadow-lg w-40 z-50">
                    <p className="px-4 py-2 text-xs text-gray-300 border-b border-white/5">
                      {session.user.name}
                    </p>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-white/5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden text-gray-400 hover:text-white transition"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* =======================
          MOBILE DRAWER 
      ======================== */}
      <div
        className={`
        fixed inset-x-0 top-[104px] bg-blueprint-900 border-b border-white/10 transition-all duration-300 ease-in-out xl:hidden z-30
        ${isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}
      `}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          
          {/* Mobile Search Input */}
          <div className="relative md:hidden mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search drawings..."
              className="w-full bg-blueprint-800 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white"
            />
          </div>

          <nav className="flex flex-col gap-3 text-sm font-bold text-gray-300 uppercase tracking-widest">
             {/* Corporate Links (Only visible here on Mobile) */}
             <div className="flex flex-col gap-3 border-b border-white/10 pb-4 mb-2">
                <Link href="/about" onClick={toggleMenu} className="hover:text-white text-gray-400 text-xs">About Us</Link>
                <Link href="/contact" onClick={toggleMenu} className="hover:text-white text-gray-400 text-xs">Contact Us</Link>
                <Link href="/privacy" onClick={toggleMenu} className="hover:text-white text-gray-400 text-xs">Privacy Policy</Link>
             </div>

            {/* Main Categories */}
            <Link href="/drawings" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">Drawings</Link>
            <Link href="/drawings?category=hvac" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">HVAC Design</Link>
            <Link href="/drawings?category=fire-protection" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">Fire Protection</Link>
            <Link href="/drawings?category=plumbing" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">Plumbing</Link>
            <Link href="/drawings?category=bim" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">BIM</Link>
            <Link href="/drawings?category=revit" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">Revit Families</Link>
            <Link href="/drawings?category=autocad" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">AutoCAD Blocks</Link>
            <Link href="/blog" onClick={toggleMenu} className="hover:text-blueprint-400 border-b border-white/5 pb-2">Blogs</Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
