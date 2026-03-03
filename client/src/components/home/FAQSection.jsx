import React from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What file formats are included?",
    a: "All our packs include high-fidelity .DWG files for AutoCAD and .DXF files for universal compatibility with software like SolidWorks, Revit, and Rhino."
  },
  {
    q: "Can I use these for commercial projects?",
    a: "Yes. Every purchase includes a royalty-free commercial license. You can use these drawings in your professional projects, client presentations, and construction documents."
  },
  {
    q: "How do I receive my files after purchase?",
    a: "Once your payment is confirmed, you will receive an instant download link on the checkout page and via email. You can also access your downloads anytime from your account dashboard."
  }
];

export default function FAQSection() {
  return (
    <section className="relative z-10 py-24 max-w-3xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details 
            key={i} 
            className="group border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all hover:border-blueprint-500/30"
          >
            <summary className="p-6 cursor-pointer font-bold text-white flex justify-between items-center list-none outline-none">
              {faq.q}
              <ChevronDown className="transition-transform duration-300 group-open:rotate-180 w-5 h-5 text-blueprint-400" />
            </summary>
            
            <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}