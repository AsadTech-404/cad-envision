import React from 'react';
import Link from 'next/link';
import { Linkedin, Instagram, Twitter, Github, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const disciplines = [
    { name: 'HVAC', href: '/drawings?category=hvac' },
    { name: 'Plumbing', href: '/drawings?category=plumbing' },
    { name: 'Electrical', href: '/drawings?category=electrical' },
    { name: 'Revit Families', href: '/drawings?category=revit-families' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Tutorials', href: '/blog' },
  ];

  return (
    <footer className="bg-blueprint-900 border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              CAD<span className="text-blueprint-500"> Envision</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Providing precision-engineered CAD assets and Revit families for the global architecture and engineering community.
            </p>
            <div className="flex gap-4">
              <Link href="https://linkedin.com" className="w-10 h-10 rounded-lg bg-blueprint-700 flex items-center justify-center text-gray-400 hover:bg-blueprint-500 hover:text-white transition-all">
                <Linkedin size={18} />
              </Link>
              <Link href="https://instagram.com" className="w-10 h-10 rounded-lg bg-blueprint-700 flex items-center justify-center text-gray-400 hover:bg-blueprint-500 hover:text-white transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="https://twitter.com" className="w-10 h-10 rounded-lg bg-blueprint-700 flex items-center justify-center text-gray-400 hover:bg-blueprint-500 hover:text-white transition-all">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Disciplines Column */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 font-mono text-blueprint-500">
              // Disciplines
            </h4>
            <ul className="space-y-4">
              {disciplines.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group">
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-blueprint-500" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6 font-mono text-blueprint-500">
              // Resources
            </h4>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="bg-blueprint-700/50 p-6 rounded-2xl border border-white/5">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4 font-mono">
              Support Terminal
            </h4>
            <p className="text-gray-500 text-[10px] uppercase mb-4 leading-tight">
              Technical inquiries or custom block requests:
            </p>
            <Link 
              href="mailto:scadenvision@gmail.com" 
              className="flex items-center gap-3 text-white hover:text-blueprint-300 transition-colors group"
            >
              <Mail size={18} className="text-blueprint-500" />
              <span className="text-sm font-medium truncate">scadenvision@gmail.com</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-[10px] font-mono uppercase tracking-widest">
            Privacy | Do not sell or share my personal information | Cookie preferences | Terms of use | Legal | © {currentYear} CAD ENVISION MARKETPLACE. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}