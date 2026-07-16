'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { categoryService, Category } from '@/services/category.service';
import Link from 'next/link';

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Static fallback categories if DB is empty
    const staticCategories = [
        { id: 1, name: 'Semua', slug: 'all' },
        { id: 2, name: 'Daster', slug: 'daster' },
        { id: 3, name: 'Setelan', slug: 'setelan' },
        { id: 4, name: 'Tunik', slug: 'tunik' },
        { id: 5, name: 'Dress', slug: 'dress' },
        { id: 6, name: 'Atasan', slug: 'atasan' },
        { id: 7, name: 'Bawahan', slug: 'bawahan' },
        { id: 8, name: 'Outer', slug: 'outer' },
    ];

    const displayCategories = categories.length > 0 ? categories : staticCategories;

    return (
        <>
            <Navbar />
            <CartDrawer />
            
            <div className="min-h-screen bg-gray-50 flex flex-col pb-20 md:pb-0 pt-6">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-2xl md:text-4xl font-bold font-heading mb-2">Kategori</h1>
                    <p className="text-gray-500 text-sm md:text-base mb-8">Temukan koleksi GHEVERHAN berdasarkan kategori pilihan.</p>
                    
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {[1,2,3,4,5,6,7,8].map(i => (
                                <div key={i} className="animate-pulse bg-white rounded-xl aspect-[3/4] border border-gray-100" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {displayCategories.map((cat) => (
                                <Link href={`/categories/${cat.slug}`} key={cat.id} className="group">
                                    <div className="bg-white rounded-xl aspect-[3/4] border border-gray-100 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={`https://via.placeholder.com/300x400/F8F8F8/111111?text=${cat.name}`} 
                                            alt={cat.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-lg font-bold font-heading tracking-wide">{cat.name}</h3>
                                            <p className="text-xs text-gray-200 mt-1">{cat.products_count || Math.floor(Math.random() * 50) + 10} Produk</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
