'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Navbar() {
    const { getTotalItems, toggleCart } = useCartStore();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const router = useRouter();

    React.useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = mounted ? getTotalItems() : 0;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const navLinks = [
        { label: 'Kategori', href: '/categories' },
        { label: 'Wanita', href: '/categories/wanita' },
        { label: 'Pria', href: '/categories/pria' },
        { label: 'Anak', href: '/categories/anak' },
        { label: 'Sale', href: '/categories/sale' },
        { label: 'New In', href: '/categories/new-in' },
    ];

    return (
        <header className={`sticky top-0 z-30 w-full transition-all duration-200 border-b ${isScrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-md'}`}>
            {/* Desktop Top Bar (Optional: Free Shipping Banner) */}
            <div className="hidden md:block bg-primary text-white text-xs text-center py-1.5 font-medium">
                Gratis Ongkir ke Seluruh Indonesia untuk Pesanan di atas Rp 500.000
            </div>

            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Mobile: Left Hamburger */}
                <div className="md:hidden flex items-center">
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>

                {/* Mobile: Center Logo / Desktop: Left Logo */}
                <div className="flex-1 md:flex-none text-center md:text-left flex justify-center md:justify-start">
                    <Link href="/" className="text-2xl font-bold tracking-tighter font-heading">
                        GHEVERHAN
                    </Link>
                </div>

                {/* Desktop: Center Navigation Links */}
                <nav className="hidden md:flex flex-1 justify-center space-x-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label} 
                            href={link.href}
                            className="text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop & Mobile: Right Actions */}
                <div className="flex items-center space-x-1 sm:space-x-3 md:flex-none">
                    <Link href="/search" className="md:hidden">
                        <Button variant="ghost" size="icon" asChild>
                            <span>
                                <Search className="w-5 h-5" />
                            </span>
                        </Button>
                    </Link>
                    
                    {/* Desktop Search Input */}
                    <form onSubmit={handleSearch} className="hidden md:flex relative w-48 lg:w-64">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari produk, kategori, dll" 
                            className="w-full h-9 pl-9 pr-4 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all text-xs"
                        />
                        <button type="submit" className="absolute left-3 top-2.5">
                            <Search className="h-4 w-4 text-gray-400" />
                        </button>
                    </form>

                    <Link href="/account/wishlist" className="hidden sm:inline-flex">
                        <Button variant="ghost" size="icon">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </Link>
                    
                    <Link href="/account" className="hidden sm:inline-flex">
                        <Button variant="ghost" size="icon">
                            <User className="w-5 h-5" />
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}
