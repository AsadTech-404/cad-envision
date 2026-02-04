"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, CheckCircle, Clock, Ban } from 'lucide-react';

export default function OrderActions({ orderId, currentStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusUpdate = (newStatus) => {
    console.log(`Updating Order ${orderId} to: ${newStatus}`);
    // Logic: Trigger your database update here
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all ${
          isOpen ? 'bg-blueprint-500 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'
        }`}
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-blueprint-900 border border-white/10 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 border-b border-white/5 mb-1">
            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Update Status</p>
          </div>
          
          {/* PAID OPTION */}
          <button 
            onClick={() => handleStatusUpdate('Paid')} 
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
          >
            <CheckCircle size={14} /> Mark Paid
          </button>

          {/* PENDING OPTION */}
          <button 
            onClick={() => handleStatusUpdate('Pending')} 
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-gray-300 hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
          >
            <Clock size={14} /> Mark Pending
          </button>

          <div className="my-1 border-t border-white/5" />

          {/* CANCEL OPTION */}
          <button 
            onClick={() => handleStatusUpdate('Cancelled')} 
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors font-bold"
          >
            <Ban size={14} /> Cancel Order
          </button>
        </div>
      )}
    </div>
  );
}