"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle, Download, FileText, Share2, ShieldCheck, ShoppingCart, Loader2, AlertCircle } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function ProductPage  ()  {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  
  const [drawing, setDrawing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDrawingDetails = async () => {
      try {
        setLoading(true);
        // Fetch specific drawing by ID
        const res = await fetch(`http://localhost:8000/api/drawings/single/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Product not found");
        
        const data = await res.json();
        const d = data.drawing;

        // Map backend data to frontend structure
        setDrawing({
          id: d._id,
          title: d.title,
          price: d.price,
          category: d.category,
          fileType: d.fileType || "DWG",
          description: d.description || "Detailed architectural blueprint ready for professional use.",
          previewUrl: d.image,
          specs: {
            format: d.fileType ? `.${d.fileType}, .PDF` : ".DWG, .PDF",
            fileSize: d.fileSize || "Variable",
            layers: d.layers || "Organized Layers",
            software: d.software || "AutoCAD 2020+",
            units: d.units || "Metric / Imperial",
          }
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDrawingDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blueprint-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blueprint-500 animate-spin mb-4" />
        <p className="text-blueprint-500 font-mono text-xs uppercase tracking-widest">Initialising Blueprint Data...</p>
      </div>
    );
  }

  if (error || !drawing) {
    return (
      <div className="min-h-screen bg-blueprint-900 flex flex-col items-center justify-center text-white">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold uppercase tracking-tighter">Asset Not Found</h2>
        <p className="text-gray-400 mt-2">The requested drawing ID does not exist in our archives.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blueprint-900 text-white pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb / Category Tag */}
        <div className="mb-8">
            <span className="bg-blueprint-500/10 text-blueprint-500 border border-blueprint-500/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest">
                Sector: {drawing.category}
            </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Image & Description */}
          <div className="lg:col-span-2 space-y-6">
             <div className="aspect-video bg-blueprint-800 rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl">
                <img src={drawing.previewUrl} alt={drawing.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-blueprint-900/60 to-transparent" />
             </div>

             <div className="p-8 bg-white/2 border border-white/5 rounded-2xl backdrop-blur-sm">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-3 uppercase tracking-tight">
                 <FileText className="text-blueprint-500" size={20} /> 
                 Technical Documentation
                </h2>
               <p className="text-gray-400 leading-relaxed font-light whitespace-pre-line">
                 {drawing.description}
               </p>
             </div>
          </div>

          {/* Right Side: Purchase Sidebar */}
          <div className="space-y-6">
            <div className="p-8 bg-blueprint-800 border border-white/10 rounded-2xl shadow-2xl sticky top-32">
              <h1 className="text-3xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                {drawing.title}
              </h1>

              <div className="flex items-end gap-2 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                <span className="text-4xl font-black text-white">
                    {drawing.price === 0 ? "FREE" : `$${drawing.price}`}
                </span>
                <span className="text-gray-500 text-xs mb-1 font-mono uppercase">USD / Single License</span>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => addToCart(drawing)}
                  className="w-full py-4 bg-blueprint-500 hover:bg-blueprint-400 text-white font-black rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blueprint-500/20 uppercase text-sm tracking-widest"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                <button className="w-full py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold rounded-xl transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
                  <Download className="w-5 h-5 text-blueprint-500" />
                  Instant Preview
                </button>
              </div>

              {/* Technical Spec List */}
              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-4">Specifications</h3>
                {Object.entries(drawing.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 capitalize">{key}</span>
                        <span className="text-gray-200 font-mono">{value}</span>
                    </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase font-mono tracking-tighter">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
                End-to-End Encrypted Transaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

