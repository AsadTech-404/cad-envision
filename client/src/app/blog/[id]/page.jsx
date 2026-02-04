"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, User, Tag, Calendar } from 'lucide-react';
import dayjs from 'dayjs';

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/blogs/single/${id}`, {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error("Article not found");
        const data = await res.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally { 
        setLoading(false);
      }
    };

        fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center w-screen h-screen bg-blueprint-900">
        <div className="w-10 h-10 border-4 border-blueprint-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-blueprint-500 font-mono text-xs uppercase tracking-widest animate-pulse">
          Decrypting Data...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blueprint-900 text-gray-300 pb-20">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blueprint-900/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Back to Archives
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto pt-32 px-6">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mb-8 font-mono text-[10px] uppercase tracking-widest text-gray-300">
          <span className="flex items-center gap-2"><User size={14} className="text-blueprint-500"/> {blog.author || 'Admin'}</span>
          <span className="flex items-center gap-2"><Tag size={14} className="text-blueprint-500"/> {blog.category}</span>
          <span className="flex items-center gap-2"><Calendar size={14} className="text-blueprint-500"/> {dayjs(blog.createdAt).format("DD MMMM YYYY")}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-6xl font-black text-gray-300 uppercase tracking-tighter leading-none mb-10">
          {blog.title}
        </h1>

        {/* Hero Image */}
        {blog.coverImage && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full object-cover max-h-125"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-blueprint max-w-none">
          {/* Excerpt / Intro */}
          {blog.excerpt && (
            <p className="text-xl text-white font-medium leading-relaxed mb-8 border-l-4 border-blueprint-500 pl-6 py-2 bg-white/5 rounded-r-2xl italic">
              {blog.excerpt}
            </p>
          )}

          {/* Main Body */}
          <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap space-y-6">
            {blog.content}
          </div>
        </div>

        {/* Footer Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono uppercase text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}