'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { User, LogOut, Package, Heart, MapPin, Settings } from 'lucide-react';

export default function AccountPage() {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect or show skeleton
  }

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      router.push('/login');
    } catch (err) {
      console.error('Failed to logout', err);
      // Force clear state anyway if API fails
      clearAuth();
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-6 mb-6">
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 uppercase">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Menu Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Menu Akun</h3>
            </div>
            <ul className="divide-y divide-gray-100">
              <li>
                <button className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <Package className="h-5 w-5 mr-3 text-gray-400" />
                  Pesanan Saya
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <Heart className="h-5 w-5 mr-3 text-gray-400" />
                  Wishlist
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  Alamat Pengiriman
                </button>
              </li>
              <li>
                <button className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                  <Settings className="h-5 w-5 mr-3 text-gray-400" />
                  Pengaturan
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center px-4 py-4 hover:bg-red-50 transition-colors text-red-600 font-medium"
                >
                  <LogOut className="h-5 w-5 mr-3 text-red-500" />
                  {loading ? 'Keluar...' : 'Keluar'}
                </button>
              </li>
            </ul>
          </div>

          {/* Info Card */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Aktivitas Terakhir</h3>
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Belum ada pesanan saat ini.</p>
                <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Mulai Belanja
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
