'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const { getTotalItems, toggleCart } = useCartStore();
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 font-medium text-sm">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                    <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                        <User className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                        <ShoppingCart className="w-5 h-5" />
                        {getTotalItems() > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
                                {getTotalItems()}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}
