"use client";
import React from "react";
import Link from "next/link";
import {
  Trash2,
  ArrowLeft,
  ShieldCheck,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeItem, subtotal, tax, total } = useCart();

  return (
    <div className="min-h-screen bg-blueprint-900 pt-24 md:pt-32 pb-20 px-4 md:px-6 hide-scrollbar">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/drawings"
            className="text-gray-500 hover:text-white transition"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Your Order <span className="text-blueprint-500">Summary</span>
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-blueprint-700/50 border border-white/10 p-5 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blueprint-500/20 rounded-lg flex items-center justify-center text-blueprint-500">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-gray-500 text-xs font-mono uppercase">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-white font-mono font-bold">
                      ${(Number(item.price) || 0).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-6">
                <p className="text-gray-500 text-xs font-mono italic">
                  // Note: Digital assets are delivered instantly to your email
                  after checkout.
                </p>
              </div>
            </div>

            {/* Checkout Sidebar */}
            <div className="bg-blueprint-700 border border-blueprint-500/30 p-8 rounded-2xl h-fit">
              <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-b border-white/10 pb-4">
                Bill Calculation
              </h2>
              <div className="space-y-4 font-mono text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">
                    ${(subtotal || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Tax (15%):</span>
                  <span className="text-white">${(tax || 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-white">
                  <span>Total:</span>
                  <span className="text-blueprint-500">
                    ${(total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full mt-8 block text-center py-4 bg-blueprint-500 text-white rounded-lg font-black uppercase tracking-widest hover:bg-blueprint-300 transition-all"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <ShoppingCart
              size={80}
              className="mx-auto mb-6 opacity-20 text-white"
            />
            <h2 className="text-2xl font-bold text-white mb-4">
              Your cart is empty
            </h2>
            <Link
              href="/drawings"
              className="px-8 py-3 bg-white text-blueprint-900 rounded-full font-bold transition-all hover:bg-blueprint-500 hover:text-white"
            >
              Start Browsing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
