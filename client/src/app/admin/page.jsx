"use client";
import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  FileCode, 
  ArrowUpRight, 
  Users 
} from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalDrawings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/count/total');
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  // Logic: These would eventually come from your API
  const cards = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: <TrendingUp className="text-emerald-500" size={24} />,
      description: "Lifetime earnings"
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart className="text-blueprint-500" size={24} />,
      description: "Successful transactions"
    },
    {
      label: "CAD Drawings",
      value: stats.totalDrawings,
      icon: <FileCode className="text-purple-500" size={24} />,
      description: "Active in catalog"
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header>
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
          System<span className="text-blueprint-500"> Overview</span>
        </h1>
        <p className="text-gray-500 font-mono text-xs mt-1">
          // CURRENT SESSION METRICS REPORT
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((stat, index) => (
          <div 
            key={index} 
            className="bg-blueprint-900/40 border border-white/10 p-6 rounded-2xl hover:border-blueprint-500/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blueprint-500/10 transition-colors">
                {stat.icon}
              </div>
            </div>
            
            <div>
              <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
              <p className="text-[10px] text-gray-600 mt-2 italic">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Section: Responsive Table/Activity */}
      <div className="bg-blueprint-900/20 border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <Users size={20} className="text-blueprint-500" />
            Recent Acquisitions
          </h2>
          <button className="text-xs font-mono text-blueprint-500 hover:text-white transition-colors uppercase tracking-widest">
            View All Orders →
          </button>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left min-w-150">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase font-mono border-b border-white/5">
                <th className="pb-4">Customer</th>
                <th className="pb-4">Blueprint</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="group hover:bg-white/1">
                  <td className="py-4 font-medium text-white">client_0{i + 42}@email.com</td>
                  <td className="py-4 text-gray-400">Residential Electrical Layout</td>
                  <td className="py-4 text-white font-bold">$29.00</td>
                  <td className="py-4 text-right">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}