"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DrawingCard from "@/components/DrawingCard";
import { Loader2, X, Search as SearchIcon } from "lucide-react";
import QuickViewModal from "@/components/QuickViewModal";

export default function DrawingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Get URL parameters
  const filterParam = searchParams.get("filter");
  const categoryParam = searchParams.get("category");
  const searchNameParam = searchParams.get("search") || ""; 

  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Fetch Data whenever URL params change
  useEffect(() => {
    const fetchFilteredDrawings = async () => {
      setLoading(true);
      try {
        // Construct the URL using your backend's query logic
        let url = new URL("https://cad-envision-server.vercel.app/api/drawings/all"); // or your specific filter endpoint
        
        if (searchNameParam) url.searchParams.append("search", searchNameParam);
        if (categoryParam) url.searchParams.append("category", categoryParam);
        // Note: Your backend handles 'search' by looking at title AND description
        
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to load drawings");
        const data = await res.json();

        const mappedData = data.drawings.map((d) => ({
          id: d._id,
          title: d.title,
          category: d.category,
          price: d.price,
          previewUrl: d.image,
          fileType: d.fileType || "DWG",
          layers: d.layers || "N/A",
        }));

        setDrawings(mappedData);
      } catch (error) {
        console.error("Error fetching drawings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredDrawings();
  }, [searchNameParam, categoryParam]); // Re-runs when search or category changes

  // 3. Simple Client-side Price Filter (since it's binary: free/premium)
  const displayDrawings = drawings.filter((d) => {
    if (filterParam === "free") return d.price === 0;
    if (filterParam === "premium") return d.price > 0;
    return true;
  });

  const clearFilters = () => router.push("/drawings");

  const handleFilterChange = (e) => {
  const value = e.target.value;
  const params = new URLSearchParams(searchParams.toString());

  if (value === "all") {
    params.delete("filter");
  } else {
    params.set("filter", value);
  }

  router.push(`/drawings?${params.toString()}`);
};


  const openQuickView = (drawing) => {
    setSelectedDrawing(drawing);
    setIsModalOpen(true);
  };

  const closeQuickView = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDrawing(null), 200); 
  };

  return (
    <div className="min-h-screen bg-blueprint-900 pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              {searchNameParam ? `Results: ${searchNameParam}` : "Library"}
            </h1>
            <p className="text-blueprint-300 font-mono text-xs uppercase">
              // {loading ? "Searching Database..." : `${displayDrawings.length} Assets Found`}
            </p>
          </div>

          {/* Filter Dropdown */}
          <div className="w-full md:w-auto">
            <label className="text-[10px] font-mono uppercase text-gray-300 block mb-2">Filter by Price</label>
            <div className="relative">
              <select
                value={filterParam || "all"}
                onChange={handleFilterChange}
                className="w-full md:w-48 bg-blueprint-700 border border-white/10 text-white text-xs p-3 pr-8 rounded-lg outline-none focus:border-blueprint-500 font-mono cursor-pointer appearance-none"
              >
                <option value="all">All Licenses</option>
                <option value="free">Free Only</option>
                <option value="premium">Premium Only</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blueprint-500" /></div>
        ) : displayDrawings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDrawings.map((drawing) => (
              <DrawingCard key={drawing.id} drawing={drawing} onQuickView={openQuickView} searchQuery={searchNameParam}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <SearchIcon className="mx-auto text-white/10 mb-4" size={48} />
            <p className="text-gray-500 font-mono text-sm uppercase">No results found for "{searchNameParam}"</p>
            <button onClick={clearFilters} className="mt-4 text-blueprint-400 underline uppercase text-xs">Clear Search</button>
          </div>
        )}
      </div>
      <QuickViewModal
        isOpen={isModalOpen} 
        onClose={closeQuickView} 
        drawing={selectedDrawing}
      />
    </div>
  );
}
