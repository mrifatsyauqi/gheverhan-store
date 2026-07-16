'use client';

import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Total Pendapatan', value: 'Rp 45.200.000', icon: DollarSign, trend: '+12.5%', isPositive: true },
    { name: 'Total Pesanan', value: '156', icon: ShoppingCart, trend: '+5.2%', isPositive: true },
    { name: 'Total Pelanggan', value: '1,245', icon: Users, trend: '+18.1%', isPositive: true },
    { name: 'Total Produk', value: '84', icon: Package, trend: '-2.4%', isPositive: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h2>
        <p className="text-gray-500">Ringkasan performa toko Anda hari ini.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${
                stat.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Grafik Penjualan (Mock)</h3>
            <select className="text-sm border border-gray-200 rounded px-2 py-1 outline-none focus:border-primary">
              <option>7 Hari Terakhir</option>
              <option>Bulan Ini</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          <div className="h-64 flex items-end space-x-2 w-full justify-between pt-4">
            {/* Mock Chart Bars */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="w-full bg-primary/10 rounded-t-sm relative group cursor-pointer" style={{ height: `${height}%` }}>
                <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm transition-all duration-300 opacity-80 group-hover:opacity-100" style={{ height: `${height}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
            <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-6">Pesanan Terbaru</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Customer {i}</p>
                    <p className="text-xs text-gray-500">2 menit yang lalu</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900">Rp {(Math.random() * 500000 + 100000).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary User Icon since it's not imported in this file
function User(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
