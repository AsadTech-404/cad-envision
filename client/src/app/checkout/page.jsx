"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const { total, cartItems } = useCart();
  const router = useRouter();

  // Optional safety: redirect if cart empty
  if (cartItems.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate payment success
    setTimeout(() => {
      router.push("/success");
    }, 2000);
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-blueprint-900 pt-24 md:pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-white transition mb-8 font-mono text-sm">
          <ArrowLeft size={16} /> BACK TO CART
        </Link>

        <div className="bg-blueprint-700 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-blueprint-500 p-6 flex justify-between items-center">
            <h1 className="text-xl font-black text-white uppercase tracking-tighter">Secure Checkout</h1>
            <CreditCard className="text-white/50" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-gray-400 tracking-widest">Cardholder Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full bg-blueprint-900 border border-white/10 rounded-lg p-4 text-white focus:border-blueprint-500 outline-none transition"
              />
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-gray-400 tracking-widest">Card Number</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  maxLength="16"
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-blueprint-900 border border-white/10 rounded-lg p-4 text-white focus:border-blueprint-500 outline-none transition"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              </div>
            </div>

            {/* Exp & CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gray-400 tracking-widest">Expiry Date</label>
                <input 
                  required
                  type="text" 
                  placeholder="MM/YY"
                  className="w-full bg-blueprint-900 border border-white/10 rounded-lg p-4 text-white focus:border-blueprint-500 outline-none transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-gray-400 tracking-widest">CVC</label>
                <input 
                  required
                  type="text" 
                  maxLength="3"
                  placeholder="123"
                  className="w-full bg-blueprint-900 border border-white/10 rounded-lg p-4 text-white focus:border-blueprint-500 outline-none transition"
                />
              </div>
            </div>

            {/* Order Total Note */}
            <div className="bg-blueprint-900/50 p-4 rounded-lg border border-white/5 flex justify-between items-center">
              <span className="text-gray-400 font-mono text-sm">TOTAL DUE:</span>
              <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              type="submit"
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all ${
                loading 
                ? 'bg-gray-700 cursor-not-allowed text-gray-400' 
                : 'bg-white text-blueprint-900 hover:bg-blueprint-500 hover:text-white'
              }`}
            >
              {loading ? 'Processing...' : 'Pay with Credit Card'}
            </button>

            <div className="flex justify-center items-center gap-4 pt-4">
               <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                 <ShieldCheck size={12} className="text-emerald-500" /> SSL SECURED
               </div>
               <div className="text-[10px] text-gray-500 font-mono">VISA | MASTERCARD</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}