"use client";
import React, { useState, useEffect, useRef } from "react";
import DrawingCard from "../components/DrawingCard";
import QuickViewModal from "../components/QuickViewModal";
import { Loader2 } from "lucide-react";

// Import your new components
import Hero from "../components/home/Hero";
import TechnicalLibrary from "../components/home/TechnicalLibrary";
import TrustStats from "../components/home/TrustStats";
import BlogSection from "../components/home/BlogSection"; 
import FAQSection from "../components/home/FAQSection";   

export default function Home() {
  const [featuredDrawings, setFeaturedDrawings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef(null);

  // --- ANIMATION LOGIC 
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

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://cad-envision-server.vercel.app/api/drawings/all");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        setFeaturedDrawings(data.drawings.slice(0, 3).map(d => ({
          id: d._id, title: d.title, category: d.category, price: d.price, previewUrl: d.image, fileType: d.fileType || "DWG"
        })));
        setCategories([...new Set(data.drawings.map(d => d.category))]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const openQuickView = (drawing) => { setSelectedDrawing(drawing); setIsModalOpen(true); };
  const closeQuickView = () => { setIsModalOpen(false); setTimeout(() => setSelectedDrawing(null), 200); };

  return (
    <main className="min-h-screen bg-blueprint-900 pt-20 md:pt-32 relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-blueprint-900/80" style={{ zIndex: 2 }} />

      <Hero categories={categories} loading={loading} />
      
      <TrustStats className="mt-10"/>

      <TechnicalLibrary categories={categories} loading={loading} />

      {/* Featured Blueprints Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 md:mt-32 pb-20 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 border-l-4 border-blueprint-500 pl-4">Featured Blueprints</h2>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blueprint-500" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDrawings.map(item => (
              <DrawingCard key={item.id} drawing={item} onQuickView={openQuickView} />
            ))}
          </div>
        )}
      </section>

      <BlogSection />
      <FAQSection />
      

      <QuickViewModal isOpen={isModalOpen} onClose={closeQuickView} drawing={selectedDrawing} />
    </main>
  );
}
