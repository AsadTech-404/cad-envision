"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  ArrowRight,
  Mail,
  FileCheck,
  Loader2,
} from "lucide-react";

// 1. Move the main logic to a sub-component
function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
      return;
    }

    fetch(`https://cad-envision-server.vercel.app/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Invalid order");
        return res.json();
      })
      .then((data) => setOrder(data.data || data.order))
      .catch(() => router.replace("/"));
  }, [orderId, router]);

  if (!order) {
    return (
      <div className="min-h-screen bg-blueprint-900 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blueprint-500 mb-4" size={48} />
        <p className="text-white font-mono uppercase text-xs">Verifying Order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blueprint-900 pt-24 md:pt-32 pb-20 px-4 md:px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {/* Success Animation Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-6 animate-pulse">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Payment <span className="text-emerald-500">Verified</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            Order Number: {orderId ? `CAD-${orderId.slice(-6).toUpperCase()}` : "N/A"}
          </p>
        </div>

        {/* Download Section */}
        <div className="bg-blueprint-700 border border-white/10 rounded-3xl overflow-hidden mb-8">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h2 className="text-white font-bold uppercase text-sm tracking-wider flex items-center gap-2">
              <FileCheck size={18} className="text-blueprint-300" /> Ready for Download
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            {order.items.map((item) => (
              <div key={item._id} className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold">{item.drawing?.title || "Project File"}</h3>
                  <p className="text-gray-500 text-xs font-mono uppercase">
                    Qty: {item.qty} • PKR {item.price}
                  </p>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-blueprint-500 text-white rounded-xl hover:bg-blueprint-400 transition">
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps / Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="p-6 bg-blueprint-700/30 border border-white/5 rounded-2xl flex gap-4">
            <Mail className="text-blueprint-300 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Email Sent</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                We've sent a backup download link and your tax invoice to your registered email.
              </p>
            </div>
          </div>
          <div className="p-6 bg-blueprint-700/30 border border-white/5 rounded-2xl flex gap-4">
            <CheckCircle2 size={24} className="text-blueprint-300 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Lifetime Access</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                These files are now stored in your account library for future access.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/drawings"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blueprint-500 text-white rounded-xl font-bold hover:bg-blueprint-300 transition shadow-lg shadow-blueprint-500/20"
          >
            Back to Home <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// 2. The Default Export wrapped in Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-blueprint-900 flex justify-center items-center">
        <Loader2 className="animate-spin text-blueprint-500" size={48} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
