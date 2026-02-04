"use client";

import React, { useEffect } from "react";
import {
  X,
  Download,
  ShoppingBag,
  FileText,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function QuickViewModal({ isOpen, onClose, drawing }) {
  const { addToCart } = useCart();

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !drawing) return null;

  // --- DYNAMIC SPECS ---
  // Using data from the DB if it exists, otherwise fallback to defaults
  const specs = {
    format: drawing.fileType || "DWG",
    layers: drawing.layers || "Organized",
    software: drawing.software || "AutoCAD",
  };

  return (
    <div
      className="fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-blueprint-900 border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/5 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Dynamic Image */}
          <div className="relative h-72 md:h-auto bg-blueprint-800 group">
            <img
              src={drawing.previewUrl}
              alt={drawing.title}
              className="w-full h-full object-cover"
            />
            {/* Blueprint Grid Overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-t from-blueprint-900 via-transparent to-transparent"></div>
          </div>

          {/* Right Side: Details */}
          <div className="p-8 md:p-10 flex flex-col h-full bg-linear-to-br from-blueprint-900 to-blueprint-950">
            <div className="mb-8">
              <span className="text-blueprint-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-3 block">
                // {drawing.category}
              </span>
              <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">
                {drawing.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 font-light">
                {drawing.description || 
                  `High-precision ${drawing.category} technical drawing. Optimized for professional architectural and engineering workflows.`}
              </p>
            </div>

            {/* Dynamic Price Section */}
            <div className="mb-8">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">
                        {drawing.price === 0 ? "FREE" : `$${drawing.price}`}
                    </span>
                    <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">USD / License</span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(drawing)}
                  className="py-4 bg-white text-blueprint-900 hover:bg-blueprint-400 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg shadow-white/5"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
                <Link 
                  href={`/drawings/${drawing.id}`}
                   className="py-4 bg-blueprint-500/10 border border-blueprint-500/30 text-blueprint-500 hover:bg-blueprint-500 hover:text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                >
                   Full View <ChevronRight size={16} />
                </Link>
              </div>
              
              <p className="text-center text-[9px] text-gray-500 font-mono uppercase tracking-tighter flex items-center justify-center gap-2">
                <ShieldCheck size={12} className="text-emerald-500" /> Verified Engineering Standard Asset
              </p>
            </div>

            {/* Mini Specs Box */}
            <div className="mt-8 grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                        <span className="text-[9px] text-gray-500 uppercase font-mono tracking-widest">{key}</span>
                        <span className="text-xs text-gray-200 font-bold">{value}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}