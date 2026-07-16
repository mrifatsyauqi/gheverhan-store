'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export function BottomNavigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const itemsCount = useCartStore((state) => state.getTotalItems());

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Kategori', href: '/categories', icon: LayoutGrid },
    { name: 'Keranjang', href: '/cart', icon: ShoppingCart, badge: mounted ? itemsCount : 0 },
    { name: 'Akun', href: '/account', icon: User },
  ];

  // Do not show on admin pages or specific checkout flows if needed
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 md:hidden pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
