"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DrawingCard from '../components/DrawingCard';
import QuickViewModal from '../components/QuickViewModal';
import { Loader2 } from 'lucide-react'; // Assuming you have lucide-react installed

export default function Home() {
  const [featuredDrawings, setFeaturedDrawings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FETCH DATA FROM API ---
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://cad-envision-server.vercel.app/api/drawings/all");
        
        if (!res.ok) throw new Error("Failed to fetch data");
        
        const data = await res.json();
        const allDrawings = data.drawings;

        // 1. Prepare Featured Drawings (Take the newest 3)
        // We also map the API keys (like _id) to match your UI components
        const mappedDrawings = allDrawings.map(d => ({
          id: d._id, // Map MongoDB _id to id
          title: d.title,
          category: d.category,
          price: d.price,
          previewUrl: d.image, // Map backend 'image' to frontend 'previewUrl'
          fileType: d.fileType || "DWG", // Fallback if missing
          layers: d.layers || "N/A"
        }));

        setFeaturedDrawings(mappedDrawings);

        // 2. Extract Unique Categories Dynamically
        // This creates a list of categories based ONLY on what you actually have in the DB
        const uniqueCategories = [...new Set(allDrawings.map(d => d.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Home fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const openQuickView = (drawing) => {
    setSelectedDrawing(drawing);
    setIsModalOpen(true);
  };

  const closeQuickView = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDrawing(null), 200); 
  };

  return (
    <main className="min-h-screen bg-blueprint-900 pt-20 md:pt-32 relative overflow-hidden">
      
      {/* --- NOISE OVERLAY --- */}
      {/* This adds the subtle grainy texture across the entire background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
      <div className="noise-overlay" />

      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none sm:block" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* IMPORTANT: All content sections now need 'relative z-10' 
          to stay above the background effects. 
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <span className="text-blueprint-500 font-mono text-[10px] md:text-sm tracking-widest uppercase mb-4 block">
          Precision CAD Assets
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Professional AutoCAD <br className="hidden md:block" /> Designs for Every Scale.
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-lg px-2">
          Access high-quality floor plans, 3D models, and mechanical drawings. 
          Ready-to-use for architects and engineers.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-6 sm:px-0">
          <Link href="/drawings?filter=premium" className="w-full sm:w-auto px-8 py-4 bg-blueprint-500 text-white rounded-md font-bold hover:bg-blueprint-300 transition-all text-sm md:text-base">
            Browse Premium
          </Link>
          <Link href="/drawings?filter=free" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-md font-bold hover:bg-white/5 transition text-sm md:text-base">
            View Free Downloads
          </Link>
        </div>

        {/* --- DYNAMIC CATEGORY TAGS --- */}
        <div className="mt-12 md:mt-20 flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar px-4">
          {loading ? (
             // Simple loading state for categories
             <div className="h-8 w-24 bg-white/5 animate-pulse rounded-full"></div>
          ) : categories.length > 0 ? (
            categories.map((cat) => (
              <Link 
                key={cat} 
                href={`/drawings?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-blueprint-700 text-[10px] md:text-xs text-gray-300 font-mono hover:border-blueprint-500 hover:text-white transition-all cursor-pointer capitalize"
              >
                {cat}
              </Link>
            ))
          ) : (
             <span className="text-gray-500 text-xs font-mono">No categories found</span>
          )}
        </div>
      </section>

      {/* --- DYNAMIC DRAWING GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 md:mt-32 pb-20">
         <h2 className="text-xl md:text-2xl font-bold text-white mb-8 border-l-4 border-blueprint-500 pl-4">
           Featured Blueprints
         </h2>
         
         {loading ? (
           <div className="flex justify-center items-center h-64">
             <div className="flex flex-col items-center gap-4">
               <Loader2 className="w-10 h-10 text-blueprint-500 animate-spin" />
               <p className="text-blueprint-500 font-mono text-xs uppercase tracking-widest animate-pulse">Loading Assets...</p>
             </div>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
             {featuredDrawings.length > 0 ? (
                featuredDrawings.map((item) => (
                  <DrawingCard key={item.id} drawing={item} onQuickView={openQuickView}/>
                ))
             ) : (
                <div className="col-span-full text-center py-10 border border-dashed border-white/10 rounded-xl">
                  <p className="text-gray-500 font-mono">No featured drawings available yet.</p>
                </div>
             )}
           </div>
         )}
      </section>

      <QuickViewModal 
        isOpen={isModalOpen} 
        onClose={closeQuickView} 
        drawing={selectedDrawing} 
      />
    </main>
  );
}
