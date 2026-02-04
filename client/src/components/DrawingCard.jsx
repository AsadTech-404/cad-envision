"use client";

import React from 'react';
import Link from "next/link";
import { Download, Lock, FileCode, Layers, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

// Added 'searchQuery' prop to highlight matching text
const DrawingCard = ({ drawing, onQuickView, searchQuery = "" }) => {
  const { id, title, category, price, previewUrl, fileType, layers } = drawing;
  const { addToCart } = useCart();
  
  const isFree = price === 0;
  
  const getHighlightedText = (text, highlight) => {
  // 1. If no highlight or it's empty, just return the original text
  if (!highlight || !highlight.trim()) return text;

  // 2. ESCAPE special regex characters (like *, +, (, ), etc.)
  // This prevents the app from crashing if someone searches for "Plan(A)"
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 3. Split the text using the safe string
  const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark key={i} className="bg-blueprint-500/30 text-blueprint-300 p-0 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

  return (
    <div className="group bg-blueprint-700/50 border border-white/10 rounded-xl overflow-hidden hover:border-blueprint-500/50 transition-all duration-300 shadow-xl flex flex-col h-full">
      
      {/* Image Preview Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-blueprint-900">
        <Link href={`/drawings/${id}`}>
          <img 
            src={previewUrl || "/placeholder-blueprint.jpg"} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />
        </Link>
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 ${
          isFree ? 'bg-emerald-500/90 text-white' : 'bg-blueprint-500/90 text-white shadow-lg'
        }`}>
          {isFree ? 'Free' : 'Premium'}
        </div>

        {/* Technical Overlay */}
        <div className="absolute inset-0 bg-blueprint-900/80 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <div className="flex gap-4 mb-4">
            <div className="text-center">
              <FileCode className="w-5 h-5 text-blueprint-300 mx-auto mb-1" />
              <p className="text-[10px] text-gray-400 font-mono">{fileType}</p>
            </div>
            <div className="text-center border-l border-white/10 pl-4">
              <Layers className="w-5 h-5 text-blueprint-300 mx-auto mb-1" />
              <p className="text-[10px] text-gray-400 font-mono">{layers} Layers</p>
            </div>
          </div>
          
          <button 
            onClick={() => onQuickView(drawing)}
            className="w-full py-2 bg-white text-blueprint-900 text-xs font-black uppercase tracking-tighter rounded hover:bg-blueprint-300 transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <p className="text-[10px] font-mono text-blueprint-500 uppercase tracking-tighter mb-1">
          // {category}
        </p>
        <Link href={`/drawings/${id}`}>
          <h3 className="text-white font-semibold text-lg leading-tight mb-4 group-hover:text-blueprint-300 transition-colors line-clamp-1">
            {/* Using the highlighter here */}
            {getHighlightedText(title, searchQuery)}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-mono uppercase">Price</span>
              <span className="text-white font-bold">
                {isFree ? 'FREE' : `$${Number(price).toFixed(2)}`}
              </span>
            </div>
            
            {!isFree && (
              <button 
                onClick={() => addToCart(drawing)}
                className="p-2 bg-white/5 text-gray-400 hover:text-white hover:bg-blueprint-500 rounded-lg transition-all"
                title="Add to Cart"
              >
                <ShoppingCart size={18} />
              </button>
            )}
          </div>

          <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
            isFree 
            ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
            : 'bg-blueprint-500 text-white hover:bg-blueprint-400 shadow-lg shadow-blueprint-500/20 active:scale-95'
          }`}>
            {isFree ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {isFree ? 'Download Now' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrawingCard;
