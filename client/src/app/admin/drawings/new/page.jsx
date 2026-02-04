"use client";
import React, { useState, useEffect } from "react";
import { Save, ArrowLeft, UploadCloud, Info, DollarSign } from "lucide-react";
import Link from "next/link";

export default function AddDrawingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fileType, setFileType] = useState("");
  const [layers, setLayers] = useState("");
  const [software, setSoftware] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const uploadImage = "/assets/upload.png";

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("fileType", fileType);
    formData.append("layers", layers);
    formData.append("software", software);
    formData.append("isFree", isFree);
    formData.append("price", price);
    formData.append("image", image);

    const response = await fetch("http://localhost:8000/api/drawings/add", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("Drawing added successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
      setCategory("");
      setFileType("");
      setLayers("");
      setSoftware("");
      setIsFree(false);
      setPrice("");
      setImage("");
    } else {
      alert(data.message || "Upload failed");
    }

  } catch (error) {
    console.error("Upload error:", error);
    alert("Server not reachable. Is backend running?");
  }
};


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">


      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="flex items-center justify-between md:col-span-2">
        <Link
          href="/admin/drawings"
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-mono uppercase"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
        <button
          type="submit"
          className="bg-blueprint-500 hover:bg-blueprint-400 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blueprint-500/20 cursor-pointer"
        >
          <Save size={16} /> Add Drawing
        </button>
      </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Drawing</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label htmlFor="image">
              <img
                src={!image ? uploadImage : URL.createObjectURL(image)}
                alt="Upload"
                className="w-60 h-20 object-cover rounded-lg shadow-2xl cursor-pointer transition hover:scale-105"
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        {/* Main Info Card */}
        <div className="md:col-span-2 bg-blueprint-900/40 border border-white/10 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-blueprint-500 mb-4">
            <Info size={18} />
            <h2 className="font-bold uppercase tracking-widest text-sm">
              Primary Identification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                Drawing Title
              </label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Residential Floor Plan"
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blueprint-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-300 uppercase">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blueprint-500"
            />
          </div>
        </div>

        {/* Technical Specs Card */}
        <div className="bg-blueprint-900/40 border border-white/10 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-blueprint-500 mb-4">
            <UploadCloud size={18} />
            <h2 className="font-bold uppercase tracking-widest text-sm">
              Technical Data
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                File Type
              </label>
              <select
                name="fileType"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              >
                <option className="text-black">DWG</option>
                <option className="text-black">DXF</option>
                <option className="text-black">RVT</option>
                <option className="text-black">PDF</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                Category
              </label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              >
                <option className="text-black">HVAC</option>
                <option className="text-black">Fire Protection</option>
                <option className="text-black">CAD Blocks</option>
                <option className="text-black">Plumbing</option>
                <option className="text-black">Electrical</option>
                <option className="text-black">Revit Families</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                Layers
              </label>
              <input
                name="layers"
                type="number"
                value={layers}
                onChange={(e) => setLayers(e.target.value)}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              />
            </div>
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-300 uppercase">
              Software Version
            </label>
            <input
              name="software"
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
            />
          </div>
          </div>
        </div>

        {/* Commercial Specs Card */}
        <div className="bg-blueprint-900/40 border border-white/10 p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-blueprint-500 mb-4">
            <DollarSign size={18} />
            <h2 className="font-bold uppercase tracking-widest text-sm">
              Commercial
            </h2>
          </div>

          <div className="flex items-center justify-between p-4 bg-blueprint-950 rounded-xl border border-white/5">
            <div>
              <p className="text-white text-sm font-bold uppercase">
                Free Download
              </p>
              <p className="text-[10px] text-gray-300 font-mono">
                Set asset as open-source
              </p>
            </div>
            <input
              type="checkbox"
              name="isFree"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="w-6 h-6 accent-blueprint-500 bg-transparent border-white/10 rounded"
            />
          </div>

          <div
            className={`space-y-2 transition-opacity ${isFree ? "opacity-20 pointer-events-none" : "opacity-100"}`}
          >
            <label className="text-[10px] font-mono text-gray-300 uppercase">
              Price (USD)
            </label>
            <input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
