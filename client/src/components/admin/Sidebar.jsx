"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileBox, PenTool, Settings, LogOut, Menu, X, ChevronRight, ListOrdered } from 'lucide-react';

export default function Sidebar({ signOutAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { href: "/admin/drawings", icon: <FileBox size={20} />, label: "Manage CAD" },
    { href: "/admin/blogs", icon: <PenTool size={20} />, label: "Tutorials" },
    { href: "/admin/orders", icon: <ListOrdered size={20} />, label: "Orders" },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-blueprint-900 border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-white font-black uppercase tracking-tighter text-lg">
          CAD<span className="text-blueprint-500"> Envision</span>
        </h2>
        <button onClick={() => setIsOpen(true)} className="text-gray-400 p-2 hover:bg-white/5 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-70 w-72 bg-blueprint-900 border-r border-white/10 p-6 flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen lg:top-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-white font-black uppercase tracking-tighter text-2xl hidden lg:block">
            CAD<span className="text-blueprint-500"> Envision</span>
          </h2>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1.5 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${
                  isActive 
                  ? "bg-blueprint-500 text-white shadow-lg shadow-blueprint-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span className="text-sm font-semibold uppercase tracking-wide">{link.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        {/* User Session Termination */}
        <div className="pt-6 border-t border-white/5 mt-auto shrink-0">
          <form action={signOutAction}>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all text-sm font-mono uppercase font-bold">
              <LogOut size={18} /> Terminate Session
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}