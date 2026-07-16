'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { productService, Product } from '@/services/product.service';
import { useCartStore } from '@/store/cart-store';
import { ProductSkeleton } from '@/components/SkeletonLoading';
import { Clock, ChevronRight, Tag, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error: any) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.variants && product.variants.length > 0) {
      // For MVP, just add the first variant
      addItem(product, product.variants[0]);
    }
  };

    return (
        <>
            <Navbar />
            <CartDrawer />
            
            <div className="min-h-screen bg-gray-50 flex flex-col pb-20 md:pb-0">
                {/* 1. Hero Carousel (Mock) */}
                <section className="relative w-full aspect-[21/9] md:aspect-[3/1] bg-gray-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://picsum.photos/seed/gheverhan/1200/400" alt="Banner" className="object-cover w-full h-full opacity-80" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center bg-gradient-to-t from-black/60 to-transparent">
                        <h1 className="text-2xl md:text-5xl font-bold tracking-tight mb-2">Summer Collection</h1>
                        <p className="text-sm md:text-lg mb-4 opacity-90">Discover the perfect style for your sunny days.</p>
                        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors">
                            Shop Now
                        </button>
                    </div>
                </section>

                <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-8 md:space-y-12">
                    
                    {/* 2. Category Grid (Mock) */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">Categories</h2>
                        </div>
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                            {['Fashion', 'Electronics', 'Beauty', 'Home', 'Sports', 'Toys', 'Automotive', 'Gadgets'].map((cat, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
                                    <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full" />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-center font-medium text-gray-700">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Flash Sale (Mock) */}
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg md:text-2xl font-bold text-red-600 flex items-center gap-1">
                                    <Zap className="w-5 h-5 fill-current" />
                                    FLASH SALE
                                </h2>
                                <div className="hidden sm:flex items-center gap-1 text-sm font-bold">
                                    <span className="bg-red-600 text-white px-2 py-1 rounded">02</span>:
                                    <span className="bg-red-600 text-white px-2 py-1 rounded">45</span>:
                                    <span className="bg-red-600 text-white px-2 py-1 rounded">10</span>
                                </div>
                            </div>
                            <Link href="#" className="text-sm font-semibold text-primary hover:underline flex items-center">
                                See All <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="min-w-[140px] md:min-w-[200px] snap-start">
                                    <div className="bg-gray-50 rounded-xl aspect-square mb-3 overflow-hidden relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`https://picsum.photos/seed/flash${i}/200`} alt="Flash product" className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                            -50%
                                        </div>
                                    </div>
                                    <div className="text-red-600 font-bold text-sm md:text-base">Rp 99.000</div>
                                    <div className="text-gray-400 text-xs line-through mb-1">Rp 198.000</div>
                                    <div className="w-full bg-red-100 rounded-full h-1.5 mt-2">
                                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 4. Voucher Banner (Mock) */}
                    <section className="relative w-full aspect-[4/1] bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl overflow-hidden shadow-sm flex items-center justify-between p-4 md:p-8 text-white">
                        <div>
                            <h3 className="text-lg md:text-3xl font-bold mb-1 md:mb-2 flex items-center gap-2">
                                <Tag className="w-5 h-5 md:w-8 md:h-8" /> Claim Your Voucher!
                            </h3>
                            <p className="text-xs md:text-base opacity-90">Get up to 50% discount for your first purchase.</p>
                        </div>
                        <button className="bg-white text-red-500 px-4 py-2 md:px-8 md:py-3 rounded-full font-bold text-xs md:text-base shadow-md hover:bg-gray-50">
                            Claim
                        </button>
                    </section>

                    {/* 5. New Arrivals (Real Data) */}
                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">New Arrivals</h2>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {[1, 2, 3, 4].map(i => (
                                    <ProductSkeleton key={i} />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700">No products available yet.</h3>
                                <p className="text-gray-500 mt-1 text-sm">Please check back later.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
}
