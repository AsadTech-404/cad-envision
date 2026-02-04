"use client";
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Navbar from './Navbar';
import { useCart } from '@/app/context/CartContext';
import { CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const { showToast, setShowToast } = useCart();
  
  const hideLayoutRoutes = ['/login', '/cart', '/checkout', '/success'];
  const isAdminRoute = pathname.startsWith('/admin');
  const shouldHideLayout = hideLayoutRoutes.includes(pathname) || isAdminRoute;


  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <main>{children}</main>

      {/* Floating Notification */}
      {!shouldHideLayout && (
        <div className={`fixed bottom-10 right-6 z-100 transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
          <div className="bg-blueprint-700 border border-blueprint-500 shadow-2xl shadow-blueprint-500/20 rounded-2xl p-4 flex items-center gap-4 min-w-75">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
              <CheckCircle size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-white text-sm font-bold">Added to Cart</h4>
              <Link href="/cart" className="text-blueprint-300 text-xs font-mono uppercase hover:underline">View Summary</Link>
            </div>
            <button onClick={() => setShowToast(false)} className="text-gray-500 hover:text-white">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {!shouldHideLayout && <Footer />}
    </>
  );
}
