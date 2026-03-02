"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DrawingCard from "../components/DrawingCard";
import QuickViewModal from "../components/QuickViewModal";
import { Loader2 } from "lucide-react"; // Assuming you have lucide-react installed

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
        this.color =
          Math.random() > 0.5
            ? "rgba(0, 95, 184, 0.15)" // blueprint-500
            : "rgba(74, 144, 226, 0.1)"; // blueprint-300
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius,
        );
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
      const gradient = ctx.createRadialGradient(
        cursorGlow.x,
        cursorGlow.y,
        0,
        cursorGlow.x,
        cursorGlow.y,
        radius,
      );
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
      glows.forEach((g) => {
        g.move();
        g.draw();
      });
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
        const res = await fetch(
          "https://cad-envision-server.vercel.app/api/drawings/all",
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        const allDrawings = data.drawings;

        // 1. Prepare Featured Drawings (Take the newest 3)
        // We also map the API keys (like _id) to match your UI components
        const mappedDrawings = allDrawings.map((d) => ({
          id: d._id, // Map MongoDB _id to id
          title: d.title,
          category: d.category,
          price: d.price,
          previewUrl: d.image, // Map backend 'image' to frontend 'previewUrl'
          fileType: d.fileType || "DWG", // Fallback if missing
          layers: d.layers || "N/A",
        }));

        setFeaturedDrawings(mappedDrawings);

        // 2. Extract Unique Categories Dynamically
        // This creates a list of categories based ONLY on what you actually have in the DB
        const uniqueCategories = [
          ...new Set(allDrawings.map((d) => d.category)),
        ];
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
      <div
        className="fixed inset-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-blueprint-900/80"
        style={{ zIndex: 2 }}
      ></div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase">
          Precision CAD Assets
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Professional AutoCAD <br className="hidden md:block" /> Designs for
          Every Scale.
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-lg px-2">
          Access high-quality floor plans, 3D models, and mechanical drawings.
          Ready-to-use for architects and engineers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 px-6 sm:px-0">
          <Link
            href="/drawings?filter=premium"
            className="w-full sm:w-auto px-8 py-4 bg-blueprint-500 text-white rounded-md font-bold hover:bg-blueprint-300 transition-all text-sm md:text-base"
          >
            Browse Premium
          </Link>
          <Link
            href="/drawings?filter=free"
            className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-md font-bold hover:bg-white/5 transition text-sm md:text-base"
          >
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
                href={`/drawings?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-blueprint-700 text-[10px] md:text-xs text-gray-300 font-mono hover:border-blueprint-500 hover:text-white transition-all cursor-pointer capitalize"
              >
                {cat}
              </Link>
            ))
          ) : (
            <span className="text-gray-500 text-xs font-mono">
              No categories found
            </span>
          )}
        </div>
      </section>

      {/* --- NEW SECTION 1: TRUST STATS --- */}
    <section class="py-20 bg-slate-900/50 border-y border-slate-800">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                    <i data-lucide="layers" class="text-blue-400 w-6 h-6"></i>
                </div>
                <h4 class="font-bold mb-2">Layered Assets</h4>
                <p class="text-xs text-slate-500 uppercase tracking-widest">Industry Standard</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                    <i data-lucide="edit-3" class="text-blue-400 w-6 h-6"></i>
                </div>
                <h4 class="font-bold mb-2">Fully Editable</h4>
                <p class="text-xs text-slate-500 uppercase tracking-widest">DWG / DXF Native</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                    <i data-lucide="mouse-pointer-click" class="text-blue-400 w-6 h-6"></i>
                </div>
                <h4 class="font-bold mb-2">Instant Download</h4>
                <p class="text-xs text-slate-500 uppercase tracking-widest">Zero Wait Time</p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                    <i data-lucide="check-circle" class="text-blue-400 w-6 h-6"></i>
                </div>
                <h4 class="font-bold mb-2">Cross-Compatible</h4>
                <p class="text-xs text-slate-500 uppercase tracking-widest">AutoCAD & Others</p>
            </div>
        </div>
    </section>
    {/* --- NEW SECTION 2: THE PRECISION DIFFERENCE --- */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-32 relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Engineered for <br /> <span className="text-blueprint-500">Professional Workflows.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Stop wasting hours drafting standard components. Our library provides architect-verified assets that drop directly into your project with zero clean-up required.
          </p>
          <ul className="space-y-4">
            {[
              "Standardized Layer Management",
              "1:1 Real-world Scaling",
              "Purged and Optimized Files",
              "Blocks with Dynamic Attributes"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300 font-mono text-sm">
                <div className="w-1.5 h-1.5 bg-blueprint-500 rotate-45"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full aspect-square bg-blueprint-800/50 border border-white/10 rounded-3xl relative flex items-center justify-center group overflow-hidden">
           {/* Decorative grid for the image placeholder */}
           <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           <div className="relative text-center p-8">
              <div className="w-20 h-20 border-2 border-blueprint-500 border-dashed rounded-full animate-spin-slow mx-auto mb-4"></div>
              <p className="text-white font-bold text-xl">Technical Accuracy</p>
              <p className="text-blueprint-500 font-mono text-xs">A-Grade Standards</p>
           </div>
        </div>
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
              <p className="text-blueprint-500 font-mono text-xs uppercase tracking-widest animate-pulse">
                Loading Assets...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {featuredDrawings.length > 0 ? (
              featuredDrawings.map((item) => (
                <DrawingCard
                  key={item.id}
                  drawing={item}
                  onQuickView={openQuickView}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 border border-dashed border-white/10 rounded-xl">
                <p className="text-gray-500 font-mono">
                  No featured drawings available yet.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* --- NEW SECTION 3: CALL TO ACTION --- */}
    <section className="max-w-5xl mx-auto px-4 mb-32 relative z-10">
      <div className="bg-blueprint-500 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Start Building Faster Today.</h2>
        <p className="text-white/80 mb-10 max-w-xl mx-auto relative z-10 text-lg">
          Join 5,000+ professionals downloading premium CAD assets every month. No subscriptions, just quality.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
           <Link href="/login" className="bg-white text-blueprint-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">Create Free Account</Link>
           <Link href="/contact" className="bg-blueprint-900/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">Contact</Link>
        </div>
      </div>
    </section>

      <QuickViewModal
        isOpen={isModalOpen}
        onClose={closeQuickView}
        drawing={selectedDrawing}
      />
    </main>
  );
}
