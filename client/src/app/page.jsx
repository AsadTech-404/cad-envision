"use client";
import React, { useState, useEffect, useRef} from 'react';
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

  // --- ANIMATION LOGIC ---
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w, h;
    let animationFrameId;
    const mouse = { x: 0, y: 0 };
    const cursorGlow = { x: 0, y: 0 };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();

    class Glow {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = 300 + Math.random() * 300;
        this.dx = (Math.random() - 0.5) * 0.4;
        this.dy = (Math.random() - 0.5) * 0.4;
        // Blueprint Theme Colors: Soft Blues
        this.color = Math.random() > 0.5 
          ? "rgba(0, 95, 184, 0.15)" // blueprint-500
          : "rgba(74, 144, 226, 0.1)"; // blueprint-300
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < -this.radius) this.x = w + this.radius;
        if (this.x > w + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = h + this.radius;
        if (this.y > h + this.radius) this.y = -this.radius;
      }
    }

    const glows = Array.from({ length: 6 }, () => new Glow());

    const drawCursorLight = () => {
      cursorGlow.x += (mouse.x - cursorGlow.x) * 0.1;
      cursorGlow.y += (mouse.y - cursorGlow.y) * 0.1;

      const radius = 450;
      const gradient = ctx.createRadialGradient(cursorGlow.x, cursorGlow.y, 0, cursorGlow.x, cursorGlow.y, radius);
      gradient.addColorStop(0, "rgba(74, 144, 226, 0.15)"); 
      gradient.addColorStop(0.5, "rgba(74, 144, 226, 0.05)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorGlow.x, cursorGlow.y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      glows.forEach(g => { g.move(); g.draw(); });
      drawCursorLight();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      
      {/* 1. Animated Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none" 
        style={{ zIndex: 0 }}
      />

    

      {/* 3. Soft Gradient Overlay to blend them */}
      <div className="fixed inset-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-blueprint-900/80" style={{ zIndex: 2 }}></div>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
    Built for <span className="text-blueprint-500">Professionals</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      { title: "Architects", desc: "High-quality plans ready for real projects." },
      { title: "MEP Engineers", desc: "HVAC, plumbing & fire protection drawings." },
      { title: "Students", desc: "Learn from industry-standard CAD files." },
    ].map((item) => (
      <div
        key={item.title}
        className="bg-blueprint-700/40 border border-white/10 rounded-xl p-6 hover:border-blueprint-500 transition"
      >
        <h3 className="text-white font-bold mb-2">{item.title}</h3>
        <p className="text-gray-400 text-sm">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">
        Why Choose <span className="text-blueprint-500">CAD Envision</span>
      </h2>
      <ul className="space-y-4 text-gray-400 text-sm">
        <li>✔ Production-ready CAD drawings</li>
        <li>✔ Created by real engineers</li>
        <li>✔ Instant digital delivery</li>
        <li>✔ Clean layers & standards</li>
      </ul>
    </div>

    <div className="bg-blueprint-700/30 border border-white/10 rounded-2xl p-8">
      <p className="font-mono text-xs text-blueprint-300 uppercase">
        Designed for speed & accuracy
      </p>
      <p className="text-gray-300 mt-4">
        Stop wasting hours drafting from scratch.  
        Start with reliable, optimized CAD assets.
      </p>
    </div>
  </div>
</section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
    How It Works
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
    {["Browse", "Preview", "Purchase", "Download"].map((step, i) => (
      <div
        key={step}
        className="bg-blueprint-700/40 border border-white/10 rounded-xl p-6"
      >
        <span className="text-blueprint-500 font-mono text-sm">
          0{i + 1}
        </span>
        <h3 className="text-white font-bold mt-2">{step}</h3>
      </div>
    ))}
  </div>
</section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
    Compatible With
  </h2>

  <div className="flex flex-wrap justify-center gap-4">
    {["AutoCAD", "Revit", "BIM", "DWG", "DXF", "RVT"].map((tool) => (
      <span
        key={tool}
        className="px-5 py-2 rounded-full bg-blueprint-700 border border-white/10 text-sm text-gray-300 font-mono"
      >
        {tool}
      </span>
    ))}
  </div>
</section>

<section className="max-w-7xl mx-auto px-4 sm:px-6 py-32 text-center relative z-10">
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
    Start Building Faster Today
  </h2>
  <p className="text-gray-400 max-w-xl mx-auto mb-10">
    Download professional CAD drawings and focus on what matters — execution.
  </p>

  <Link
    href="/drawings"
    className="inline-block px-10 py-4 bg-blueprint-500 text-white rounded-lg font-black uppercase tracking-widest hover:bg-blueprint-300 transition"
  >
    Explore Drawings
  </Link>
</section>

      <QuickViewModal 
        isOpen={isModalOpen} 
        onClose={closeQuickView} 
        drawing={selectedDrawing} 
      />
    </main>
  );
}
