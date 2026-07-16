'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { authService } from '@/services/auth.service';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { User, LogOut, Package, Heart, MapPin, Settings } from 'lucide-react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated && mounted) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, mounted]);

  if (!mounted || !isAuthenticated || !user) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (err) {
      console.error('Failed to logout', err);
    } finally {
      clearAuth();
      router.push('/login');
      setLoading(false);
    }
  };

  const navItems = [
    { name: 'Dasbor', href: '/account', icon: User },
    { name: 'Pesanan Saya', href: '/account/orders', icon: Package },
    { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
    { name: 'Alamat Pengiriman', href: '/account/addresses', icon: MapPin },
    { name: 'Pengaturan Akun', href: '/account/settings', icon: Settings },
  ];

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <div className="bg-gray-50 min-h-screen py-8 pb-24 md:pb-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header Profile */}
          <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-bold text-primary font-heading uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold font-heading">{user.name}</h1>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Menu */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <ul className="divide-y divide-gray-100">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link 
                          href={item.href}
                          className={`w-full flex items-center px-6 py-4 transition-colors text-sm font-medium ${isActive ? 'bg-primary/5 text-primary border-l-2 border-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent'}`}
                        >
                          <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <button 
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full flex items-center px-6 py-4 hover:bg-red-50 transition-colors text-red-600 font-medium text-sm border-l-2 border-transparent"
                    >
                      <LogOut className="h-5 w-5 mr-3 text-red-500" />
                      {loading ? 'Keluar...' : 'Keluar'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {children}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
