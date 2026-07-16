'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Search as SearchIcon, SearchX } from 'lucide-react';
import Link from 'next/link';
import { productService, Product } from '@/services/product.service';
import { formatCurrency } from '@/utils/currency';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await productService.getProducts(query);
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil hasil pencarian');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 mb-20 md:mb-10">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
          {query ? `Hasil Pencarian untuk "${query}"` : 'Pencarian Produk'}
        </h1>
        {query && !loading && !error && (
          <p className="text-gray-500 text-sm">Menampilkan {products.length} produk ditemukan</p>
        )}
      </div>

      {!query.trim() ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <SearchIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Mulai Pencarian</h2>
          <p className="text-gray-500 max-w-md mx-auto">Ketikkan nama produk, kategori, atau gaya yang Anda cari melalui form pencarian di navigasi atas.</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-100 h-72 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center font-medium">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <SearchX className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tidak ditemukan</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">Maaf, kami tidak menemukan produk yang cocok dengan pencarian "{query}". Coba gunakan kata kunci lain.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-primary text-white text-sm rounded font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
            Lihat Semua Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group block">
              <div className="bg-gray-100 aspect-[3/4] rounded-lg overflow-hidden relative mb-4">
                {/* Fallback Image if no image is available */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                   GHEVERHAN
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-primary transition-colors line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="font-medium text-gray-900 text-sm">
                  {product.variants && product.variants.length > 0 
                    ? formatCurrency(product.variants[0].price)
                    : 'Rp 0'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
          <SearchResults />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
