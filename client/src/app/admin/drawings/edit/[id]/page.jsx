"use client";
import { Info, UploadCloud, DollarSign, Save } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    fileType: "",
    layers: "",
    software: "",
    isFree: false,
    price: "",
    image: "",
  });

  // Fetch current drawing data
  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/drawings/single/${id}`,
        );
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        setProductData({
          title: data.drawing.title,
          description: data.drawing.description,
          category: data.drawing.category,
          fileType: data.drawing.fileType,
          layers: data.drawing.layers,
          software: data.drawing.software,
          isFree: data.drawing.isFree,
          price: data.drawing.price,
        });
        setPreview(data.drawing.image);
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDrawing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit using form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("fileType", productData.fileType);
    formData.append("layers", productData.layers);
    formData.append("software", productData.software);
    formData.append("isFree", productData.isFree);
    formData.append("price", productData.price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/drawings/update/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );
      if (!res.ok) throw new Error("Failed to update drawing");
      const data = await res.json();
      window.alert("Drawing updated successfully:", data);
      setProductData({
        title: "",
        description: "",
        category: "",
        fileType: "",
        layers: "",
        software: "",
        isFree: false,
        price: "",
        image: "",
      });
    } catch (error) {
      console.error("Update error:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-blueprint-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blueprint-500 font-mono">
          Loading drawings...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex items-center justify-between md:col-span-2">
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Edit Drawing
          </h1>
          <button
                    type="submit"
                    className="bg-blueprint-500 hover:bg-blueprint-400 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blueprint-500/20 cursor-pointer"
                  >
                    <Save size={16} /> Update Drawing
                  </button>
        </div>
        {/* Image Upload */}
        <div className="p-4 rounded-lg border-2 border-dashed border-gray-200">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Product Image
          </label>
          <div className="flex items-center gap-6">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md shadow-sm border bg-white"
              />
            )}
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

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
                type="text"
                name="title"
                value={productData.title}
                onChange={handleChange}
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
              value={productData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blueprint-500"
            />
          </div>
        </div>

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
                type="fileType"
                name="fileType"
                value={productData.fileType}
                onChange={handleChange}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              >
                <option value="">Select File Type</option>
                <option value="DWG">DWG</option>
                <option value="DXF">DXF</option>
                <option value="RVT">RVT</option>
                <option value="SKP">SKP</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              >
                <option value="">Select Category</option>
                <option value="Architecture">Architecture</option>
                <option value="Engineering">Engineering</option>
                <option value="Interior Design">Interior Design</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                Layers
              </label>
              <input
                name="layers"
                type="number"
                value={productData.layers}
                onChange={handleChange}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-300 uppercase">
                Software Version
              </label>
              <input
                name="software"
                value={productData.software}
                onChange={handleChange}
                className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

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
              checked={productData.isFree}
              onChange={(e) =>
                setProductData({ ...productData, isFree: e.target.checked })
              }
              className="w-6 h-6 accent-blueprint-500 bg-transparent border-white/10 rounded"
            />
          </div>

          <div
            className={`space-y-2 transition-opacity ${productData.isFree ? "opacity-20 pointer-events-none" : "opacity-100"}`}
          >
            <label className="text-[10px] font-mono text-gray-300 uppercase">
              Price (USD)
            </label>
            <input
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              className="w-full bg-blueprint-950 border border-white/10 p-4 rounded-xl text-white font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
