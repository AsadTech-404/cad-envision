"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, X, FileText, Download, DollarSign, Layers } from "lucide-react";
import Link from "next/link";

export default function ManageCAD() {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/drawings/all");
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        setDrawings(data.drawings);
      } catch (err) {
        console.error("Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/drawings/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete drawing");
      setDrawings(drawings.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center h-64 flex-col items-center">
        <div className="w-10 h-10 border-4 border-blueprint-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-blueprint-500 font-mono text-xs uppercase tracking-widest animate-pulse">
          Loading Inventory...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">CAD Inventory</h1>
        </div>
        <Link href="/admin/drawings/new">
          <button className="bg-blueprint-500 hover:bg-blueprint-400 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            <Plus size={16} /> Add New Drawing
          </button>
        </Link>
      </div>

      <div className="bg-blueprint-900/40 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left min-w-200">
            <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Title & Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {drawings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400 font-mono">No drawings found</td>
                </tr>
              ) : (
                drawings.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-blueprint-800 border border-white/10 overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-bold text-sm">{item.title}</p>
                      <p className="text-[10px] font-mono text-blueprint-500 uppercase">{item.category}</p>
                    </td>
                    <td className="px-6 py-4 text-white font-mono">
                      {item.isFree ? "Free" : `$${item.price}`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* --- VIEW BUTTON --- */}
                        <button 
                          onClick={() => setSelectedDrawing(item)}
                          className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>

                        <Link href={`/admin/drawings/edit/${item._id}`}>
                          <button className="p-2 text-gray-500 hover:text-blueprint-500 hover:bg-blueprint-500/10 rounded-lg transition-all">
                            <Edit2 size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DETAIL MODAL --- */}
      {selectedDrawing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedDrawing(null)} // Click outside to close
          ></div>

          {/* Modal Content */}
          <div className="relative bg-blueprint-900 border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header Image */}
            <div className="h-48 w-full relative">
               <div className="absolute inset-0 bg-linear-to-t from-blueprint-900 via-transparent to-transparent z-10"></div>
               <img src={selectedDrawing.image} className="w-full h-full object-cover" alt="Cover" />
               <button 
                 onClick={() => setSelectedDrawing(null)}
                 className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all backdrop-blur-md"
               >
                 <X size={18} />
               </button>
            </div>

            {/* Content Body */}
            <div className="p-8 -mt-12 relative z-20">
              <span className="inline-block px-3 py-1 rounded-full bg-blueprint-500 text-white text-[10px] font-bold uppercase tracking-widest mb-4 shadow-lg shadow-blueprint-500/20">
                {selectedDrawing.category}
              </span>
              
              <h2 className="text-3xl font-black text-white mb-2">{selectedDrawing.title}</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                   <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-mono">
                     <DollarSign size={14} /> Price
                   </div>
                   <div className="text-xl font-bold text-white">
                     {selectedDrawing.isFree ? "Free" : `$${selectedDrawing.price}`}
                   </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                   <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-mono">
                     <Layers size={14} /> Files
                   </div>
                   <div className="text-xl font-bold text-white">
                      {/* Assuming your drawing object has a fileType or similar */}
                      {selectedDrawing.fileType || "DWG/PDF"} 
                   </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                   <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-mono">
                     <Download size={14} /> Downloads
                   </div>
                   <div className="text-xl font-bold text-white">
                      {selectedDrawing.downloads || 0}
                   </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Description</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {selectedDrawing.description || "No description provided for this blueprint."}
                </p>
              </div>

              {/* Action Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
                 <button 
                   onClick={() => setSelectedDrawing(null)}
                   className="px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                 >
                   Close
                 </button>
                 <Link href={`/admin/drawings/edit/${selectedDrawing._id}`}>
                    <button className="text-blueprint-950 text-gray-400 hover:text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                       <Edit2 size={14} /> Edit Data
                    </button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}