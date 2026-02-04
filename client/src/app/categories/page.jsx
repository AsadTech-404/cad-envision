"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap, Wind, Droplets, FlameKindling, Box, Component, Loader2, LayoutGrid } from 'lucide-react';

// Helper to map icons to category names
const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('hvac')) return <Wind size={40} />;
  if (n.includes('plumb')) return <Droplets size={40} />;
  if (n.includes('fire')) return <FlameKindling size={40} />;
  if (n.includes('elect')) return <Zap size={40} />;
  if (n.includes('block')) return <Box size={40} />;
  if (n.includes('revit') || n.includes('family')) return <Component size={40} />;
  return <LayoutGrid size={40} />; // Default icon
};

// Helper for dynamic colors
const getColor = (name) => {
  const n = name.toLowerCase();
  if (n.includes('hvac')) return 'border-sky-400';
  if (n.includes('plumb')) return 'border-blue-600';
  if (n.includes('fire')) return 'border-red-600';
  if (n.includes('elect')) return 'border-yellow-500';
  if (n.includes('block')) return 'border-gray-400';
  return 'border-indigo-500';
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessCategories = async () => {
      try {
        const res = await fetch("https://cad-envision-server.vercel.app/api/drawings/all");
        const data = await res.json();
        const allDrawings = data.drawings;

        // Count occurrences of each category
        const counts = allDrawings.reduce((acc, drawing) => {
          const cat = drawing.category || "Uncategorized";
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {});

        // Format into an array for the UI
        const dynamicCategories = Object.keys(counts).map(name => ({
          name,
          count: `${counts[name]} Files`,
          icon: getIcon(name),
          color: getColor(name)
        }));

        setCategories(dynamicCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessCategories();
  }, []);

  return (
    <div className="min-h-screen bg-blueprint-900 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Library Sectors</h1>
            <div className="h-1 grow bg-white/5 hidden md:block"></div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blueprint-500 animate-spin mb-4" />
            <p className="text-blueprint-500 font-mono text-xs uppercase tracking-widest">Scanning Database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link 
                href={`/drawings?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`} 
                key={cat.name}
              >
                <div className={`group p-8 bg-gray-800 border-l-4 ${cat.color} hover:bg-blueprint-500 transition-all cursor-pointer relative overflow-hidden`}>
                  {/* Decorative background icon */}
                  <div className="absolute -right-4 -bottom-4 text-white opacity-[0.03] group-hover:opacity-10 transition-opacity">
                    {React.cloneElement(cat.icon, { size: 120 })}
                  </div>

                  <div className="text-white mb-4 group-hover:scale-110 group-hover:text-white transition-all duration-300 relative z-10">
                    {cat.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{cat.name}</h3>
                    <p className="text-gray-500 group-hover:text-white/80 font-mono text-xs mt-2 uppercase tracking-widest">
                      // {cat.count}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                <p className="text-gray-500 font-mono">No categories found in current database.</p>
            </div>
        )}
      </div>
    </div>
  );
}
