'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Bell } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const { getTotalItems, toggleCart } = useCartStore();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = mounted ? getTotalItems() : 0;

    return (
        <header className={`sticky top-0 z-30 w-full transition-all duration-200 border-b ${isScrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-md'}`}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>

                {/* Logo */}
                <div className="flex-1 md:flex-none text-center md:text-left">
                    <Link href="/" className="text-2xl font-bold tracking-tighter">
                        GHEVERHAN
                    </Link>
                </div>

                {/* Search Bar - Hidden on mobile, visible on tablet+ */}
                <div className="hidden md:flex flex-1 max-w-xl mx-8">
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            placeholder="Search premium products..." 
                            className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <Link href="/account">
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                            <User className="w-5 h-5" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="relative md:hidden" onClick={toggleCart}>
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" className="relative hidden md:inline-flex" onClick={toggleCart}>
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}
