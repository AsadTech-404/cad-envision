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
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the drawings page with the search query in the URL
      router.push(`/drawings?search=${encodeURIComponent(searchQuery.trim())}`);
      
      setIsMenuOpen(false); // Close mobile menu
      setSearchQuery("");   // Clear input
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-blueprint-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Side: Logo & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-white"
          >
            CAD<span className="text-blueprint-500"> Envision</span>
          </Link>

          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/drawings" className="hover:text-white transition">
              Drawings
            </Link>
            <Link href="/categories" className="hover:text-white transition">
              Categories
            </Link>
            <Link href="/blog" className="hover:text-white transition">
              Tutorials
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>

        {/* Right Side: Search, Cart & Mobile Toggle */}
        <div className="flex items-center gap-5 relative">
          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drawings..."
              className="bg-blueprint-700 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blueprint-500 transition w-48 lg:w-64 text-white"
            />
          </form>

          <Link href="/cart" className="relative group p-2">
            <ShoppingCart className="w-5 h-5 text-gray-400 hover:text-white transition" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blueprint-500 text-[10px] font-bold text-white ring-2 ring-blueprint-900 animate-in fade-in zoom-in duration-300">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth Button */}
          {!session ? (
            <Link href="/login" className="p-2">
              <User className="w-5 h-5 text-gray-400 hover:text-white transition" />
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="w-9 h-9 rounded-full bg-blueprint-500 text-white font-bold flex items-center justify-center"
              >
                {session.user.name.charAt(0).toUpperCase()}
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 bg-blueprint-900 border border-white/10 rounded-lg shadow-lg w-40">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`
        fixed inset-x-0 top-16 bg-blueprint-900 border-b border-white/10 transition-all duration-300 ease-in-out md:hidden z-40
        ${isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}
      `}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {/* Mobile Search Input */}
          <div className="relative sm:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search drawings..."
              className="w-full bg-blueprint-700 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white"
            />
          </div>

          <nav className="flex flex-col gap-4 text-lg font-medium text-gray-300">
            <Link
              href="/about"
              onClick={toggleMenu}
              className="hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/drawings"
              onClick={toggleMenu}
              className="hover:text-white transition"
            >
              Drawings
            </Link>
            <Link
              href="/categories"
              onClick={toggleMenu}
              className="hover:text-white transition"
            >
              Categories
            </Link>
            <Link
              href="/blog"
              onClick={toggleMenu}
              className="hover:text-white transition"
            >
              Tutorials
            </Link>
            <Link
              href="/privacy"
              onClick={toggleMenu}
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="hover:text-white transition"
            >
              Contact
            </Link>{" "}
          </nav>
        </div>
      </div>
    </nav>
  );
}
