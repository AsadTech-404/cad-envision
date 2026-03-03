import { Layers, Edit3, MousePointerClick, CheckCircle } from "lucide-react";
import React from "react";

const stats = [
  { icon: <Layers />, label: "Layered Assets", sub: "Industry Standard" },
  { icon: <Edit3 />, label: "Fully Editable", sub: "DWG / DXF Native" },
  { icon: <MousePointerClick />, label: "Instant Download", sub: "Zero Wait Time" },
  { icon: <CheckCircle />, label: "Cross-Compatible", sub: "AutoCAD & Others" }
];

export default function TrustStats() {
  return (
    <section className="relative z-10 py-20 bg-zinc-950 border-y border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              {React.cloneElement(stat.icon, { className: "text-blue-400 w-6 h-6" })}
            </div>
            <h4 className="font-bold mb-2 text-white">{stat.label}</h4>
            <p className="text-xs text-slate-500 uppercase tracking-widest">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
