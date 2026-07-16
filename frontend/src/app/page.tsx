'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { SplashScreen } from '@/components/SplashScreen';
import { productService, Product } from '@/services/product.service';
import { useCartStore } from '@/store/cart-store';
import { ProductSkeleton } from '@/components/SkeletonLoading';
import { ChevronRight, Zap } from 'lucide-react';
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
      addItem(product, product.variants[0]);
    }
  };

  const categories = [
      { name: 'Semua', image: 'https://placehold.co/80x80/eeeeee/999999?text=All' },
      { name: 'Daster', image: 'https://placehold.co/80x80/eeeeee/999999?text=Daster' },
      { name: 'Setelan', image: 'https://placehold.co/80x80/eeeeee/999999?text=Setelan' },
      { name: 'Tunik', image: 'https://placehold.co/80x80/eeeeee/999999?text=Tunik' },
      { name: 'Dress', image: 'https://placehold.co/80x80/eeeeee/999999?text=Dress' },
      { name: 'Atasan', image: 'https://placehold.co/80x80/eeeeee/999999?text=Atasan' },
      { name: 'Bawahan', image: 'https://placehold.co/80x80/eeeeee/999999?text=Bawahan' },
      { name: 'Outer', image: 'https://placehold.co/80x80/eeeeee/999999?text=Outer' },
  ];

  return (
    <>
      <SplashScreen />
      <Navbar />
      <CartDrawer />
      
      <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
        {/* Hero Banner */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[21/9] md:aspect-[3/1] bg-[#0A0A0A] overflow-hidden text-white">
          <div className="absolute inset-0 flex items-center">
            {/* Temporary Placeholder Image */}
            <div className="w-1/2 h-full bg-[#111111]"></div>
            <div className="w-1/2 h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://placehold.co/800x600/111111/444444?text=Hero+Image" alt="Hero Model" className="object-cover w-full h-full opacity-80" />
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 max-w-7xl mx-auto w-full">
            <h2 className="text-sm md:text-lg font-medium tracking-widest uppercase mb-2">New Collection</h2>
            <h1 className="text-3xl md:text-6xl font-bold font-heading mb-4 leading-tight">SUMMER 2025</h1>
            <p className="text-sm md:text-xl font-light mb-8 max-w-sm text-gray-300">Elegant. Premium. You.</p>
            <div>
              <Link href="/products">
                <button className="bg-white text-black px-8 py-3 rounded-none font-semibold text-sm hover:bg-gray-100 transition-colors uppercase tracking-wider">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-12">
          
          {/* Categories Grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-heading">Kategori</h2>
              <Link href="/categories" className="text-sm font-semibold text-gray-500 hover:text-primary flex items-center">
                Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <Link href={`/categories/${cat.name.toLowerCase()}`} key={i} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-full overflow-hidden border border-gray-100 group-hover:border-primary transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Flash Sale */}
          <section className="bg-white rounded-none border border-gray-100 p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold font-heading flex items-center gap-1 uppercase">
                  <Zap className="w-5 h-5 fill-black" /> Flash Sale
                </h2>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <span className="bg-black text-white px-2 py-1">02</span>:
                  <span className="bg-black text-white px-2 py-1">15</span>:
                  <span className="bg-black text-white px-2 py-1">30</span>
                </div>
              </div>
              <Link href="/sale" className="text-sm font-semibold text-gray-500 hover:text-primary hidden sm:block">
                Lihat Semua
              </Link>
            </div>
            
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
              {/* Dummy Flash Sale Products */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[160px] md:min-w-[220px] snap-start border border-gray-100 p-2 group cursor-pointer hover:border-gray-300 transition-colors">
                  <div className="bg-gray-50 aspect-[3/4] mb-3 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://placehold.co/300x400/eeeeee/999999?text=Product+${i}`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                      -20%
                    </div>
                  </div>
                  <h3 className="text-sm font-medium line-clamp-1 mb-1">One Set Premium {i}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold text-sm">Rp 99.000</span>
                    <span className="text-gray-400 text-xs line-through">Rp 399.000</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1 mt-3">
                    <div className="bg-black h-1" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">Tersisa 12 item</div>
                </div>
              ))}
            </div>
          </section>

          {/* New Arrivals (Real Data) */}
          <section>
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
              <h2 className="text-xl font-bold font-heading">Produk Terbaru</h2>
              <Link href="/products" className="text-sm text-gray-500 hover:text-primary">Lihat Semua</Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map(i => <ProductSkeleton key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-gray-100">
                <h3 className="text-lg font-medium text-gray-700">Belum ada produk</h3>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </section>

        </main>
      </div>
    </>
  );
}
