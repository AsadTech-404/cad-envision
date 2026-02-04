"use client";
import { useState } from "react";
import {
  Save,
  ArrowLeft,
  BookOpen,
  Clock,
  Layout,
  Eye,
  Hash,
} from "lucide-react";
import Link from "next/link";

export default function AddArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("isPublished", isPublished);
    formData.append("coverImage", coverImage);

    try {
      const res = await fetch("http://localhost:8000/api/blogs/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Article added successfully");
        setTitle("");
        setContent("");
        setAuthor("");
        setCategory("");
        setIsPublished(true);
        setCoverImage(null);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/blogs"
              className="text-gray-500 hover:text-white flex items-center gap-2 text-xs font-mono uppercase mb-2"
            >
              <ArrowLeft size={14} /> Return to Articles
            </Link>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-8 py-3 bg-blueprint-500 hover:bg-blueprint-400 text-white rounded-xl font-bold text-xs uppercase transition-all flex items-center gap-2 shadow-lg shadow-blueprint-500/20"
            >
              <Save size={16} /> Add Article
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-blueprint-900/40 border border-white/10 p-6 rounded-3xl space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Article Title
                </label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Advanced Layer Management in CAD"
                  className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white text-lg font-bold outline-none focus:border-blueprint-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Body Content (Markdown Supported)
                </label>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="15"
                  placeholder="Write your technical guide here..."
                  className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-gray-300 font-mono text-sm outline-none focus:border-blueprint-500 leading-relaxed"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <div className="bg-blueprint-900/40 border border-white/10 p-6 rounded-3xl space-y-6">
              <h2 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <Layout size={16} className="text-blueprint-500" />{" "}
                Configurations
              </h2>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Category
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-blueprint-950 border border-white/10 p-3 rounded-xl text-white text-xs"
                  required
                >
                  <option className="text-black">Hvac</option>
                  <option className="text-black">Plumbing</option>
                  <option className="text-black">Fire Protection</option>
                  <option className="text-black">Electrical</option>
                  <option className="text-black">CAD Blocks</option>
                  <option className="text-black">Revit Families</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Author Name
                </label>
                <input
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-blueprint-950 border border-white/10 p-3 rounded-xl text-white text-xs"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublished(false)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${
                    !isPublished
                      ? "bg-blueprint-500 text-white"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  Draft
                </button>

                <button
                  type="button"
                  onClick={() => setIsPublished(true)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase ${
                    isPublished
                      ? "bg-blueprint-500 text-white"
                      : "bg-white/5 text-gray-500"
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            {/* Thumbnail Card */}
            <div className="bg-blueprint-900/40 border border-white/10 p-6 rounded-3xl space-y-4">
              <h2 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 ">
                <BookOpen size={16} className="text-blueprint-500" /> Cover
                Image
              </h2>
              <input
                type="file"
                hidden
                id="coverImage"
                onChange={(e) => setCoverImage(e.target.files[0])}
                required
              />

              <label
                htmlFor="coverImage"
                className="cursor-pointer text-xs text-blueprint-500"
              >
                Select Image
              </label>
              <div className="aspect-video bg-blueprint-950 rounded-xl border border-dashed border-white/10 flex items-center justify-center overflow-hidden">
                {coverImage ? (
                  <img
                    src={URL.createObjectURL(coverImage)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-[10px] font-mono text-gray-400 uppercase">
                    No Image Selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
