import React from 'react';
import Link from 'next/link';
import { Linkedin, Instagram, Twitter, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const disciplines = [
    { name: 'HVAC Systems', href: '/drawings?category=hvac' },
    { name: 'Plumbing & Piping', href: '/drawings?category=plumbing' },
    { name: 'Electrical Layouts', href: '/drawings?category=electrical' },
    { name: 'Revit Families', href: '/drawings?category=revit-families' },
  ];

  const resources = [
    { name: 'Documentation', href: '/docs' },
    { name: 'CAD Tutorials', href: '/blog' },
    { name: 'Commercial License', href: '/license' },
    { name: 'Support Center', href: '/contact' },
  ];

  return (
    <footer className="relative bg-blueprint-900 border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-blueprint-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase">
                CAD<span className="text-blueprint-500">Envision</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed">
                Precision-engineered assets for the modern architect. Standardizing quality for a digital construction world.
              </p>
            </div>
            
            <div className="flex gap-3 mt-8">
              {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:border-blueprint-500 hover:text-white hover:bg-blueprint-500/10 transition-all duration-300">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Disciplines Column */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-blueprint-500 rounded-full animate-pulse"></span>
              Engineering
            </h4>
            <ul className="space-y-4">
              {disciplines.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-blueprint-400 text-sm transition-all flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">
              User Resources
            </h4>
            <ul className="space-y-4">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Terminal Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-br from-blueprint-500 to-transparent rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-blueprint-800/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <h4 className="text-blueprint-400 font-mono text-[10px] uppercase tracking-widest mb-4">
                System_Status: Operational
              </h4>
              <p className="text-white font-bold text-lg mb-2">Need Custom Blocks?</p>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Our team can generate specific .DWG or Revit families to your specs.
              </p>
              <Link 
                href="mailto:scadenvision@gmail.com" 
                className="inline-flex items-center gap-2 bg-blueprint-600 hover:bg-blueprint-500 text-white text-xs font-bold py-3 px-4 rounded-lg transition-all w-full justify-center group"
              >
                <Mail size={14} />
                Open Support Ticket
                <ExternalLink size={12} className="opacity-50" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
            {['Privacy', 'Terms', 'Legal', 'Cookies'].map(link => (
              <Link key={link} href="#" className="text-xs uppercase text-slate-500 hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>
          <p className="text-slate-300 text-xs">
            © {currentYear} CAD ENVISION • Engineered with Precision
          </p>
        </div>
      </div>
    </footer>
  );
}