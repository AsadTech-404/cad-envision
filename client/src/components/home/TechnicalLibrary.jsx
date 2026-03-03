import { ArrowRight, Download, Home as HomeIcon, Settings, Cpu, Layers } from "lucide-react";
import React from "react";
import Link from "next/link";

const getCategoryIcon = (category) => {
  const name = category.toLowerCase();
  if (name.includes("arch")) return <HomeIcon size={80} />;
  if (name.includes("mech") || name.includes("tool")) return <Settings size={80} />;
  if (name.includes("elec") || name.includes("circuit")) return <Cpu size={80} />;
  return <Layers size={80} />;
};

export default function TechnicalLibrary({ categories, loading }) {
  return (
    <section id="categories" className="relative z-10 py-24 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Technical Library</h2>
          <p className="text-slate-400">Precision-engineered blocks for every discipline.</p>
        </div>
        <button className="text-blueprint-300 font-semibold flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? [1, 2, 3].map(i => <div key={i} className="h-80 bg-white/5 animate-pulse rounded-2xl" />) : 
          categories.slice(0, 3).map((cat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 group hover:border-blueprint-500/50 transition-all">
              <div className="h-48 rounded-xl bg-blueprint-900 mb-4 overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blueprint-500/20 group-hover:text-blueprint-500/40 transition">
                  {getCategoryIcon(cat)}
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white capitalize">{cat}</h3>
                <span className="font-mono text-blueprint-300 font-bold">Pack</span>
              </div>
              <p className="text-sm text-slate-400 mb-6">Standard industrial {cat} assets and detailed drawings.</p>
              <Link href={`/drawings?category=${cat}`} className="w-full py-3 bg-white/5 group-hover:bg-blueprint-500 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Pack
              </Link>
            </div>
        ))}
      </div>
    </section>
  );
}