'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Heart, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

export default function AccountOverview() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold font-heading mb-2">Selamat Datang, {user.name}!</h2>
        <p className="text-gray-500 text-sm mb-8">Ini adalah dasbor akun Anda. Di sini Anda bisa mengelola pesanan, melihat wishlist, dan mengubah pengaturan.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-100 rounded-lg p-6 bg-gray-50 flex items-start space-x-4">
            <div className="p-3 bg-white rounded-full shadow-sm text-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Pesanan</p>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-6 bg-gray-50 flex items-start space-x-4">
            <div className="p-3 bg-white rounded-full shadow-sm text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Belum Dibayar</p>
            </div>
          </div>

          <div className="border border-gray-100 rounded-lg p-6 bg-gray-50 flex items-start space-x-4">
            <div className="p-3 bg-white rounded-full shadow-sm text-red-500">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Wishlist</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold font-heading text-lg">Pesanan Terakhir</h3>
          <Link href="/account/orders" className="text-sm text-primary font-medium hover:underline">
            Lihat Semua
          </Link>
        </div>
        
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Package className="h-10 w-10 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm mb-4">Anda belum memiliki pesanan.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-primary text-white text-sm rounded font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
            Mulai Belanja
          </Link>
        </div>
      </div>
    </div>
  );
}
