import React from 'react';
import Link from 'next/link';
import { Image as ImageIcon, ChevronRight } from 'lucide-react';

const articles = [
  {
    tag: "Guide",
    title: "Beginner’s Guide to Layers in CAD",
    desc: "Organizing your drawings doesn't have to be a nightmare. Here's our proven system...",
    date: "Oct 10, 2026",
    link: "#"
  },
  {
    tag: "Tips",
    title: "Common CAD Drawing Mistakes and How to Avoid Them",
    desc: "From broken polylines to scaling errors, avoid these top 5 productivity killers.",
    date: "Oct 05, 2026",
    link: "#"
  },
  {
    tag: "Resources",
    title: "DWG vs DXF: What’s the Difference?",
    desc: "Choosing the right file format for cross-platform collaboration and 3D printing.",
    date: "Sep 28, 2026",
    link: "#"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="relative z-10 py-24 bg-blueprint-900/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Filters */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 italic">Learn CAD Like a Pro</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button className="px-5 py-2 bg-blueprint-500 text-white rounded-full text-sm font-semibold hover:bg-blueprint-400 transition">All Articles</button>
            {["Tutorials", "Drafting Tips", "Industry Insights"].map((filter) => (
              <button key={filter} className="px-5 py-2 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white rounded-full text-sm font-semibold transition border border-white/10">
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden mb-12 flex flex-col md:flex-row hover:border-blueprint-500/30 transition-colors">
          <div className="md:w-1/2 h-64 md:h-auto bg-blueprint-800/40 relative group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-20 h-20 text-white/10 group-hover:text-blueprint-500/20 transition-colors" />
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12">
            <span className="text-blueprint-400 text-xs font-bold tracking-widest uppercase mb-4 block">Featured Tutorial</span>
            <h3 className="text-3xl font-bold text-white mb-4">How to Create Professional Floor Plans in AutoCAD</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Master the art of architectural drafting with our step-by-step guide on line weights, scale management, and template layouts for 2026 standards.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-mono">Oct 12, 2026 • 12 min read</span>
              <Link href="#" className="text-blueprint-300 font-bold flex items-center gap-2 hover:translate-x-1 transition group">
                Read Full Article <ChevronRight className="w-4 h-4 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <article key={i} className="flex flex-col group">
              <div className="h-48 bg-white/5 rounded-xl mb-4 border border-white/10 overflow-hidden relative group-hover:border-blueprint-500/50 transition-all">
                <div className="absolute top-4 left-4 bg-blueprint-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter text-white z-10">
                  {article.tag}
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-blueprint-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blueprint-300 transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-slate-400 mb-4 grow">
                {article.desc}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{article.date}</span>
                <Link href={article.link} className="text-blueprint-400 font-bold hover:text-white transition-colors">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center gap-2">
          <button className="w-10 h-10 rounded border border-blueprint-500/50 flex items-center justify-center text-blueprint-300 bg-blueprint-500/10">1</button>
          <button className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-white transition">2</button>
          <button className="w-10 h-10 rounded border border-white/10 flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-white transition">3</button>
        </div>
      </div>
    </section>
  );
}