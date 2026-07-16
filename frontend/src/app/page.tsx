'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { productService, Product } from '@/services/product.service';
import { useCartStore } from '@/store/cart-store';

export default function Home() {
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
      // For MVP, just add the first variant
      addItem(product, product.variants[0]);
    }
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Welcome to GHEVERHAN</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
          Discover our latest collection of premium products carefully curated for you.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">New Arrivals</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border rounded-lg h-72 animate-pulse"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white border rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">No products available yet.</h3>
            <p className="text-gray-500 mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
      </div>
    </>
  );
}
