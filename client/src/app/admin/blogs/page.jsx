"use client";
import { PenTool, CheckCircle, Clock, X, User, Tag, Eye } from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function TutorialsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null); // State for the Preview Modal

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://cad-envision-server.vercel.app/api/blogs/all");
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-center justify-center h-64 flex-col items-center">
        <div className="w-10 h-10 border-4 border-blueprint-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-blueprint-500 font-mono text-xs uppercase tracking-widest animate-pulse">
          Loading Articales...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Articles</h1>
          <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest mt-1">//TOTAL Articals: {blogs.length}</p>
        </div>
        <Link href="/admin/blogs/addArtical">
          <button className="p-3 bg-blueprint-500 hover:bg-blueprint-400 text-white rounded-xl transition-all shadow-lg shadow-blueprint-500/20">
            <PenTool size={20} />
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {blogs.length === 0 ? (
          <div className="bg-blueprint-900/20 border border-white/5 p-12 rounded-3xl text-center">
             <p className="text-gray-600 font-mono text-xs uppercase">No internal records found.</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-blueprint-900/40 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-blueprint-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-1.5 h-10 rounded-full ${blog.isPublished ? 'bg-blueprint-500' : 'bg-gray-700'}`} />
                <div>
                  <h3 className="text-white font-bold group-hover:text-blueprint-300 transition-colors">{blog.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[10px] font-mono uppercase text-gray-300">
                    <span className={`flex items-center gap-1 ${blog.isPublished ? 'text-emerald-500' : 'text-amber-500'}`}>
                      <CheckCircle size={12}/> {blog.isPublished ? 'Live' : 'Draft'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12}/>{dayjs(blog.createdAt).format("DD MMM YYYY")}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedBlog(blog)} 
                  className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white hover:bg-blueprint-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Preview
                </button>
                <button className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest">
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- PREVIEW MODAL --- */}
      {selectedBlog && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 md:p-8 overflow-hidden">
          {/* Backdrop - Covers the entire screen including the sidebar */}
          <div 
            className="absolute inset-0 bg-blueprint-950/90 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-300" 
            onClick={() => setSelectedBlog(null)} 
          />
          
          {/* Content Card - THE POP ANIMATION */}
          <div className="relative bg-blueprint-900 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] z-1000 hide-scrollbar animate-in fade-in zoom-in-95 duration-200 ease-out">
            
            {/* Modal Header Actions (Sticky) */}
            <div className="sticky top-0 bg-blueprint-900/95 backdrop-blur-sm p-6 border-b border-white/5 flex justify-between items-center z-20">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 ml-10 bg-blueprint-500/10 border border-blueprint-500/20 text-blueprint-500 text-[9px] font-mono uppercase tracking-widest rounded-full">
                  System Preview Mode
                </span>
              </div>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-gray-400 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12 space-y-8">
              {selectedBlog.coverImage && (
                <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={selectedBlog.coverImage} 
                    alt="Cover" 
                    className="w-full aspect-video object-cover" 
                  />
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-4xl ml-3 font-black text-white leading-tight tracking-tight">{selectedBlog.title}</h2>
                <div className="flex flex-wrap gap-4 text-[11px] font-mono uppercase text-gray-400">
                  <span className="flex items-center gap-1.5 border border-white/5 px-2 py-1 rounded-md">
                    <User size={14} className="text-blueprint-500"/> {selectedBlog.author || 'Admin'}
                  </span>
                  <span className="flex items-center gap-1.5 border border-white/5 px-2 py-1 rounded-md">
                    <Tag size={14} className="text-blueprint-500"/> {selectedBlog.category}
                  </span>
                  <span className="flex items-center gap-1.5 border border-white/5 px-2 py-1 rounded-md">
                    <Eye size={14} className="text-blueprint-500"/> {selectedBlog.views} Views
                  </span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                {selectedBlog.excerpt && (
                  <p className="text-gray-400 italic text-lg border-l-4 border-blueprint-500 pl-4 py-2 bg-white/5 rounded-r-lg font-serif">
                    {selectedBlog.excerpt}
                  </p>
                )}
                <div className="mt-8 ml-4 text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-base">
                  {selectedBlog.content}
                </div>
              </div>

              {/* Tags Section */}
              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
                  {selectedBlog.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-500 font-mono uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
