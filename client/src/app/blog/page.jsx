"use client";
import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]); // Dynamic categories
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  // --- FETCH DYNAMIC CATEGORIES ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/blogs/categories");
        const data = await res.json();
        // Combine "All" with whatever comes from the DB
        setCategories(["All", ...data.categories]);
      } catch (error) {
        console.error("Categories fetch error:", error);
      }
    };
    fetchCategories();
  }, []);

  // --- FETCH BLOGS (EXISTING LOGIC) ---
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:8000/api/blogs/all?page=${currentPage}&limit=${limit}&search=${searchQuery}`;
        if (activeCategory !== "All") {
          url += `&category=${activeCategory}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchQuery, activeCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-blueprint-900 pt-32 pb-20 px-6 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-300 uppercase tracking-tighter">Articles</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="font-mono text-[10px] text-blueprint-500 uppercase">
                  {activeCategory} Archives Page {currentPage}
                </p>
                {(activeCategory !== "All" || searchQuery) && (
                  <button 
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-[9px] font-mono text-red-400 hover:text-red-300 uppercase tracking-tighter"
                  >
                    <X size={10} /> Clear Filters
                  </button>
                )}
              </div>
            </div>

            <div className="relative w-full md:w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blueprint-500 transition-colors" size={16} />
              <input 
                type="text"
                placeholder="SEARCH ARTICLES..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-mono tracking-widest text-white focus:outline-none focus:border-blueprint-500/50 transition-all"
              />
            </div>
          </div>

          {/* --- DYNAMIC CATEGORY SELECTOR --- */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? "bg-blueprint-500 text-white shadow-lg shadow-blueprint-500/20" 
                  : "bg-white/5 text-gray-500 hover:text-white border border-transparent hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>
        
        {/* Blog List Section */}
        <div className="space-y-12 min-h-100">
          {loading ? (
             <div className="flex justify-center items-center h-48">
                <div className="w-8 h-8 border-2 border-blueprint-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : blogs.length === 0 ? (
            <div className="bg-blueprint-900/20 border border-white/5 p-12 rounded-3xl text-center">
              <p className="text-gray-600 font-mono text-xs uppercase">No records found in this sector.</p>
            </div>
          ) : (
            blogs.map((post) => (
              <article key={post._id} className="group border-b border-white/10 pb-12 transition-all">
                <div className="flex items-center gap-4 mb-4 font-mono text-xs">
                  <span className="text-blueprint-500 uppercase tracking-widest bg-blueprint-500/10 px-2 py-0.5 rounded">
                    {post.category || 'General'}
                  </span>
                  <span className="text-gray-600 flex items-center gap-1">
                    <Clock size={12}/>{dayjs(post.createdAt).format("DD MMM YYYY")}
                  </span>
                </div>
                <Link href={`/blog/${post._id}`}>
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blueprint-300 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
                <Link 
                  href={`/blog/${post._id}`} 
                  className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all group/link"
                >
                  Retrieve Article <ArrowRight size={16} className="text-blueprint-500" />
                </Link>
              </article>
            ))
          )}
        </div>

        {/* Pagination UI */}
        {!loading && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-white/10 rounded-lg text-gray-500 hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg font-mono text-xs transition-all ${
                    currentPage === i + 1 
                    ? "bg-blueprint-500 text-white" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-white/10 rounded-lg text-gray-500 hover:text-white disabled:opacity-20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}