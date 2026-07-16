'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

export default function AdminOrdersPage() {
  // Mock data for Admin Orders Foundation
  const [orders] = useState([
    { id: 1, order_number: 'ORD-12345ABC', customer_name: 'Budi Santoso', total: 450000, status: 'Pending Payment', date: '2026-07-16' },
    { id: 2, order_number: 'ORD-67890DEF', customer_name: 'Siti Aminah', total: 1250000, status: 'Paid', date: '2026-07-16' },
    { id: 3, order_number: 'ORD-54321XYZ', customer_name: 'Andi Wijaya', total: 750000, status: 'Shipped', date: '2026-07-15' },
    { id: 4, order_number: 'ORD-98765QWE', customer_name: 'Rina Marlina', total: 320000, status: 'Cancelled', date: '2026-07-14' },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-full"><CheckCircle2 className="w-3 h-3 mr-1" /> Dibayar</span>;
      case 'Shipped':
        return <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full"><CheckCircle2 className="w-3 h-3 mr-1" /> Dikirim</span>;
      case 'Pending Payment':
        return <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase rounded-full"><Clock className="w-3 h-3 mr-1" /> Menunggu</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded-full"><XCircle className="w-3 h-3 mr-1" /> Dibatalkan</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Daftar Pesanan</h2>
          <p className="text-gray-500 text-sm">Kelola semua pesanan yang masuk ke toko Anda.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Cari nomor pesanan atau nama..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{order.order_number}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-primary transition-colors flex items-center space-x-1 text-xs font-bold uppercase ml-auto">
                      <Eye className="w-4 h-4 mr-1" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <p>Menampilkan {orders.length} pesanan</p>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Sebelumnnya</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}
