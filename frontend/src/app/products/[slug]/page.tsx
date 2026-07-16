'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productService, Product } from '@/services/product.service';
import { useCartStore } from '@/store/cart-store';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, Check } from 'lucide-react';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const addItem = useCartStore(state => state.addItem);
    const toggleCart = useCartStore(state => state.toggleCart);

    useEffect(() => {
        if (!slug) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await productService.getProductBySlug(slug);
                setProduct(data);
            } catch (err: any) {
                setError('Produk tidak ditemukan.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const defaultVariant = product?.variants?.[0];
    const price = defaultVariant ? Number(defaultVariant.price) : 0;
    const stock = defaultVariant?.stock ?? 0;
    const imageUrl = product?.seo_metadata?.og_image || 'https://via.placeholder.com/600x600?text=No+Image';

    const handleAddToCart = () => {
        if (product && defaultVariant) {
            for (let i = 0; i < quantity; i++) {
                addItem(product, defaultVariant);
            }
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const handleBuyNow = () => {
        if (product && defaultVariant) {
            for (let i = 0; i < quantity; i++) {
                addItem(product, defaultVariant);
            }
            router.push('/checkout');
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 py-8 pb-24 md:pb-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h1>
                    <p className="text-gray-500 mb-6">Produk yang Anda cari tidak tersedia atau sudah dihapus.</p>
                    <Link href="/">
                        <Button>Kembali ke Beranda</Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <CartDrawer />

            <div className="min-h-screen bg-gray-50 py-4 md:py-8 pb-28 md:pb-8">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {/* Product Image */}
                        <div className="relative">
                            <div className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {stock <= 0 && (
                                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                    <span className="bg-black text-white text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                                        Stok Habis
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            {/* Brand */}
                            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">
                                {product.brand?.name || 'GHEVERHAN'}
                            </div>

                            {/* Name */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="text-2xl md:text-3xl font-bold text-primary mb-4">
                                Rp {price.toLocaleString('id-ID')}
                            </div>

                            {/* Stock */}
                            <div className="flex items-center space-x-2 mb-6">
                                {stock > 0 ? (
                                    <>
                                        <span className="inline-flex items-center text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium">
                                            <Check className="w-4 h-4 mr-1" />
                                            Stok Tersedia ({stock})
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium">
                                        Stok Habis
                                    </span>
                                )}
                                {defaultVariant?.sku && (
                                    <span className="text-xs text-gray-400">SKU: {defaultVariant.sku}</span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {product.description || 'Belum ada deskripsi untuk produk ini.'}
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            {stock > 0 && (
                                <div className="flex items-center space-x-4 mb-6">
                                    <span className="text-sm font-medium text-gray-700">Jumlah:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-2 border-x border-gray-300 font-medium min-w-[48px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            {stock > 0 && (
                                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="flex-1 font-bold"
                                        onClick={handleAddToCart}
                                    >
                                        {addedToCart ? (
                                            <>
                                                <Check className="w-5 h-5 mr-2" />
                                                Ditambahkan!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                Tambah ke Keranjang
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="flex-1 font-bold"
                                        onClick={handleBuyNow}
                                    >
                                        Beli Sekarang
                                    </Button>
                                </div>
                            )}

                            {/* Trust Badges */}
                            <div className="border-t border-gray-100 pt-6 grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center text-center">
                                    <Truck className="w-5 h-5 text-gray-400 mb-1" />
                                    <span className="text-[10px] sm:text-xs text-gray-500">Gratis Ongkir</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <Shield className="w-5 h-5 text-gray-400 mb-1" />
                                    <span className="text-[10px] sm:text-xs text-gray-500">Produk Asli</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <RotateCcw className="w-5 h-5 text-gray-400 mb-1" />
                                    <span className="text-[10px] sm:text-xs text-gray-500">Bisa Retur</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            {stock > 0 && (
                <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center gap-3 md:hidden z-40">
                    <div className="flex-1">
                        <div className="text-lg font-bold text-primary">
                            Rp {price.toLocaleString('id-ID')}
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { handleAddToCart(); toggleCart(); }}
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="font-bold px-6" onClick={handleBuyNow}>
                        Beli
                    </Button>
                </div>
            )}
        </>
    );
}
