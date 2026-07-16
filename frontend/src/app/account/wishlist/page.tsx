'use client';

import React, { useEffect, useState } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { wishlistService, Wishlist } from '@/services/wishlist.service';
import Link from 'next/link';
import { formatCurrency } from '@/utils/currency';

export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setWishlists(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  const handleRemove = async (productId: number) => {
    try {
      await wishlistService.removeWishlist(productId);
      setWishlists(wishlists.filter(w => w.product_id !== productId));
    } catch (err) {
      console.error('Failed to remove from wishlist');
    }
  };

  return (
    <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading mb-1">Wishlist</h2>
        <p className="text-gray-500 text-sm">Produk-produk yang Anda simpan untuk dibeli nanti.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      ) : wishlists.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Wishlist masih kosong</h3>
          <p className="text-gray-500 text-sm mb-6">Tambahkan produk kesukaan Anda ke wishlist.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-primary text-white text-sm rounded font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {wishlists.map((item) => (
            <div key={item.id} className="group border border-gray-100 rounded-lg overflow-hidden flex flex-col relative">
              <button 
                onClick={() => handleRemove(item.product_id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10"
                title="Hapus dari wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <Link href={`/products/${item.product.slug}`} className="block h-48 bg-gray-100 relative">
                {/* Fallback Image */}
              </Link>
              
              <div className="p-4 flex flex-col flex-grow">
                <Link href={`/products/${item.product.slug}`} className="hover:text-primary transition-colors">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{item.product.name}</h3>
                </Link>
                <p className="font-medium text-gray-900 mb-4">
                  {item.product.variants && item.product.variants.length > 0 
                    ? formatCurrency(item.product.variants[0].price)
                    : 'Rp 0'}
                </p>
                
                <button className="mt-auto w-full flex items-center justify-center space-x-2 border-2 border-primary text-primary py-2 rounded font-bold uppercase text-xs hover:bg-primary hover:text-white transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Lihat Produk</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
