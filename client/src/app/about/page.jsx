import React from 'react';
import { Shield, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-blueprint-900 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
          Engineering <span className="text-blueprint-500">Precision.</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-400 font-sans leading-relaxed">
            <p>
              CAD Envision was founded to bridge the gap between high-level engineering design and accessibility. 
              We provide a curated archive of technical drawings that meet industry standards.
            </p>
            <p>
              Every file in our library undergoes a rigorous quality check for layer management, 
              scale accuracy, and block consistency.
            </p>
          </div>
          
          <div className="bg-blueprint-700 p-8 border border-white/10 rounded-2xl space-y-6">
            <div className="flex gap-4">
              <Target className="text-blueprint-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold uppercase text-sm">Our Mission</h4>
                <p className="text-xs text-gray-500 mt-1 uppercase font-mono tracking-tight">Standardizing digital blueprints for global infrastructure.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="text-blueprint-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold uppercase text-sm">Quality Assurance</h4>
                <p className="text-xs text-gray-500 mt-1 uppercase font-mono tracking-tight">All assets verified for AutoCAD 2024+ compatibility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}