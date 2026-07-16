'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductCard } from '@/components/ProductCard';
import { productService, Product } from '@/services/product.service';
import { useCartStore } from '@/store/cart-store';
import { ProductSkeleton } from '@/components/SkeletonLoading';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        if (product.variants && product.variants.length > 0) {
            addItem(product, product.variants[0]);
        }
    };

    return (
        <>
            <Navbar />
            <CartDrawer />
            
            <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0 pt-6">
                <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar Filter (Desktop) */}
                    <aside className="hidden md:block w-64 flex-shrink-0 space-y-6">
                        <div className="font-heading font-bold text-lg border-b pb-2 mb-4">Filter</div>
                        
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Kategori</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /> Semua</label></li>
                                <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /> Daster</label></li>
                                <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /> Tunik</label></li>
                                <li><label className="flex items-center gap-2"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" /> Setelan</label></li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm">Harga</h3>
                            <div className="flex items-center gap-2">
                                <input type="number" placeholder="Min" className="w-full text-xs border border-gray-200 rounded p-2" />
                                <span>-</span>
                                <input type="number" placeholder="Max" className="w-full text-xs border border-gray-200 rounded p-2" />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold font-heading">Semua Produk</h1>
                                <p className="text-sm text-gray-500 mt-1">{products.length} Produk Ditemukan</p>
                            </div>
                            
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <Button variant="outline" size="sm" className="md:hidden flex-1 flex justify-center gap-2">
                                    <Filter className="w-4 h-4" /> Filter
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 md:flex-none flex justify-between gap-2 md:w-48">
                                    <span className="flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Urutkan</span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <ProductSkeleton key={i} />)}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 bg-white border border-gray-100 rounded-xl">
                                <h3 className="text-lg font-medium text-gray-700">Belum ada produk</h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                                ))}
                            </div>
                        )}
                        
                        {!loading && products.length > 0 && (
                            <div className="mt-12 flex justify-center">
                                <Button variant="outline" className="px-8 border-primary text-primary hover:bg-primary hover:text-white transition-colors uppercase tracking-wider font-semibold text-xs">
                                    Muat Lebih Banyak
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
