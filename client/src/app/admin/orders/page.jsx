import React from "react";
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  Download,
} from "lucide-react";
import OrderActions from "@/components/admin/OrderActions";

export default async function OrderManagePage() {
  const orders = [
    {
      _id: "64b7f8e2c9e77a001f5d6a1b",
      customerEmail: "email@gmail.com",
      items: [
        { title: "Residential Building Plan" },
        { title: "Electrical Layout" },
      ],
      totalAmount: 299.99,
      status: "Paid",
      createdAt: "2024-07-19T12:34:56Z",
    },
    {
      _id: "64b7f9a3c9e77a001f5d6a1c",
      customerEmail: "emai@gmail.com",
      items: [{ title: "Commercial Complex Design" }],
      totalAmount: 499.49,
      status: "Pending",
      createdAt: "2024-07-19T13:00:00Z",
    },
    {
      _id: "64b7fa4bc9e77a001f5d6a1d",
      customerEmail: "email@gmail.com",
      items: [{ title: "Landscape Architecture Plan" }],
      totalAmount: 199.0,
      status: "Refunded",
      createdAt: "2024-07-19T13:30:00Z",
    },
  ];

  // Quick Stats Logic
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: <ShoppingBag size={18} />,
      color: "text-blueprint-500",
    },
    {
      label: "Completed",
      value: orders.filter((o) => o.status === "Paid").length,
      icon: <CheckCircle2 size={18} />,
      color: "text-emerald-500",
    },
    {
      label: "Pending/Issues",
      value: orders.filter((o) => o.status !== "Paid").length,
      icon: <Clock size={18} />,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Order<span className="text-blueprint-500"> Ledger</span>
          </h1>
          <p className="text-gray-500 font-mono text-xs mt-1">
            // TRANSACTION DATABASE AUDIT
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-blueprint-900/20 p-4 rounded-2xl border border-white/5">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by Email or Order ID..."
            className="w-full bg-blueprint-950 border border-white/10 py-3 pl-12 pr-4 rounded-xl text-sm text-white outline-none focus:border-blueprint-500 transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-bold uppercase rounded-xl transition-all border border-white/5">
            <Filter size={14} /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-blueprint-500 hover:bg-blueprint-400 text-white text-xs font-bold uppercase rounded-xl transition-all shadow-lg shadow-blueprint-500/10">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-blueprint-900/40 border border-white/10 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full text-left min-w-225">
            <thead className="bg-white/5 border-b border-white/10">
              <tr className="text-[10px] font-mono uppercase text-gray-500">
                <th className="px-6 py-5">Order Reference</th>
                <th className="px-6 py-5">Customer Email</th>
                <th className="px-6 py-5">Blueprint Items</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="group hover:bg-white/2 transition-colors"
                >
                  <td className="px-6 py-5">
                    <p className="text-blueprint-500 font-mono text-xs uppercase tracking-tighter">
                      #{order._id.toString().slice(-8).toUpperCase()}
                    </p>
                    <p className="text-[9px] text-gray-600 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-white text-sm font-medium">
                      {order.customerEmail}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      {order.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 w-fit"
                        >
                          {item.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-white font-black text-sm">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <OrderActions
                      orderId={order._id}
                      currentStatus={order.status}
                    />
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

// Helper Component for Status Badges
function StatusBadge({ status }) {
  const styles = {
    Paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Refunded: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    Failed: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.Pending}`}
    >
      {status}
    </span>
  );
}
