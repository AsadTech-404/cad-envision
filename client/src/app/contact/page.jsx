"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, ShieldCheck, Send } from 'lucide-react';

export default function ContactPage() {
     const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill in all fields" });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email" });
      return;
    }

    // Simulate API Call
    setStatus({
      type: "success",
      message: "Message sent successfully! I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setStatus({ type: "", message: "" }), 3000);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // In a real app, you would use fetch() to send the data to your API
//     alert("Message Transmitting to scadenvision@gmail.com...");
//   };

  return (
    <div className="min-h-screen bg-blueprint-900 pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Subtle Background Grid for Aesthetic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 relative z-10">
        
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              Get in <span className="text-blueprint-500">Touch</span>
            </h1>
            {/* <p className="text-gray-400 font-mono text-sm uppercase tracking-tighter">
              Contact Me
            </p> */}
          </header>
          
          <div className="space-y-6">
            <div className="group flex items-center gap-4 text-gray-300">
              <div className="w-10 h-10 rounded-lg bg-blueprint-500/10 flex items-center justify-center group-hover:bg-blueprint-500 transition-colors">
                <Mail className="text-blueprint-500 group-hover:text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Direct Email</span>
                <a href="mailto:scadenvision@gmail.com" className="text-sm font-medium cursor-pointer">scadenvision@gmail.com</a>
              </div>
            </div>

            {/* <div className="group flex items-center gap-4 text-gray-300">
              <div className="w-10 h-10 rounded-lg bg-blueprint-500/10 flex items-center justify-center group-hover:bg-blueprint-500 transition-colors">
                <MessageSquare className="text-blueprint-500 group-hover:text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Live Support</span>
                <span className="text-sm font-medium">Available 9am - 5pm EST</span>
              </div>
            </div> */}
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-mono">
              <ShieldCheck size={14} className="text-emerald-500" />
              End-to-End Encryption 
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 bg-blueprint-700/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[10px] font-mono uppercase text-gray-500 tracking-widest">Full Name</label>
              <input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange} 
                placeholder="Enter your name"
                className="w-full bg-blueprint-900 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blueprint-500 focus:ring-1 focus:ring-blueprint-500 transition-all placeholder:text-gray-700"  
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-mono uppercase text-gray-500 tracking-widest">Email Address</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange} 
                placeholder="name@company.com"
                className="w-full bg-blueprint-900 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blueprint-500 focus:ring-1 focus:ring-blueprint-500 transition-all placeholder:text-gray-700" 
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label  htmlFor="message" className="text-[10px] font-mono uppercase text-gray-500 tracking-widest">Inquiry Message</label>
              <textarea
                type="message"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange} 
                rows="5"
                placeholder="Describe your technical requirements..."
                className="w-full bg-blueprint-900 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-blueprint-500 focus:ring-1 focus:ring-blueprint-500 transition-all placeholder:text-gray-700 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="sm:col-span-2 py-4 bg-blueprint-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blueprint-300 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blueprint-500/20"
            >
              <Send size={18} /> Send Message
            </button>
            {status.message && (
                  <div
                    className={`p-4 rounded-xl ${status.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}
                  >
                    {status.message}
                  </div>
                )}
          </form>
        </div>

      </div>
    </div>
  );
}
