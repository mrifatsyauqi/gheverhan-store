'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productService, Product } from '@/services/product.service';
import { useCartStore } from '@/store/cart-store';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, Check, Heart, Share2 } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    
    // Variant state (Mock)
    const [selectedColor, setSelectedColor] = useState('Hitam');
    const [selectedSize, setSelectedSize] = useState('M');
    const [activeTab, setActiveTab] = useState('desc'); // desc, spec, review

    const addItem = useCartStore(state => state.addItem);
    const toggleCart = useCartStore(state => state.toggleCart);

    useEffect(() => {
        if (!slug) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await productService.getProductBySlug(slug);
                setProduct(data);
                
                // Fetch related (mock)
                const all = await productService.getProducts();
                setRelatedProducts(all.filter(p => p.id !== data.id).slice(0, 4));
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
    const imageUrl = product?.seo_metadata?.og_image || 'https://via.placeholder.com/800x800?text=No+Image';

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
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            <div className="aspect-[3/4] bg-gray-200 rounded-xl animate-pulse" />
                            <div className="space-y-4 pt-4">
                                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-8" />
                                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
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
                    <h1 className="text-2xl font-bold font-heading mb-2">Produk Tidak Ditemukan</h1>
                    <p className="text-gray-500 mb-6">Produk yang Anda cari tidak tersedia atau sudah dihapus.</p>
                    <Link href="/products">
                        <Button>Kembali Belanja</Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <CartDrawer />

            <div className="min-h-screen bg-white py-4 md:py-8 pb-28 md:pb-16">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6 uppercase tracking-wider">
                        <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-primary transition-colors">Produk</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium truncate">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        {/* Product Image Gallery */}
                        <div className="relative">
                            <div className="aspect-[3/4] bg-gray-50 rounded-none overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                                {stock <= 0 && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <span className="bg-black text-white text-sm font-bold px-4 py-2 uppercase tracking-wider">
                                            Stok Habis
                                        </span>
                                    </div>
                                )}
                            </div>
                            {/* Thumbnails (Mock) */}
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="aspect-[3/4] bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity border border-transparent hover:border-gray-300">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imageUrl} alt="" className="object-cover w-full h-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col pt-2 md:pt-4">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
                                        {product.brand?.name || 'GHEVERHAN'}
                                    </div>
                                    <h1 className="text-2xl md:text-4xl font-bold font-heading mb-4">
                                        {product.name}
                                    </h1>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:text-red-500 hover:bg-red-50">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-2xl md:text-3xl font-bold text-primary mb-6">
                                Rp {price.toLocaleString('id-ID')}
                            </div>

                            {/* Variants (Color) */}
                            <div className="mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Warna: {selectedColor}</h3>
                                <div className="flex gap-3">
                                    {['Hitam', 'Putih', 'Coklat'].map(color => (
                                        <button 
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 text-sm border transition-colors ${selectedColor === color ? 'border-primary bg-primary text-white' : 'border-gray-200 hover:border-gray-400'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Variants (Size) */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-wider">Ukuran: {selectedSize}</h3>
                                    <button className="text-xs text-gray-500 underline hover:text-primary">Panduan Ukuran</button>
                                </div>
                                <div className="flex gap-3">
                                    {['S', 'M', 'L', 'XL'].map(size => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center text-sm border transition-colors ${selectedSize === size ? 'border-primary bg-primary text-white' : 'border-gray-200 hover:border-gray-400'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {stock > 0 ? (
                                <div className="flex flex-col gap-3 mb-8">
                                    <div className="flex gap-3">
                                        <div className="flex items-center border border-gray-300 w-32">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-3 hover:bg-gray-100 transition-colors flex-1 flex justify-center"><Minus className="w-4 h-4" /></button>
                                            <span className="px-2 py-3 font-medium text-center text-sm">{quantity}</span>
                                            <button onClick={() => setQuantity(Math.min(stock, quantity + 1))} className="px-3 py-3 hover:bg-gray-100 transition-colors flex-1 flex justify-center"><Plus className="w-4 h-4" /></button>
                                        </div>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="flex-1 font-bold uppercase tracking-wider h-auto border-primary text-primary hover:bg-primary hover:text-white"
                                            onClick={handleAddToCart}
                                        >
                                            {addedToCart ? <Check className="w-5 h-5 mr-2" /> : <ShoppingCart className="w-5 h-5 mr-2" />}
                                            {addedToCart ? 'Ditambahkan' : 'Tambah'}
                                        </Button>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="w-full font-bold uppercase tracking-wider py-6"
                                        onClick={handleBuyNow}
                                    >
                                        Beli Sekarang
                                    </Button>
                                </div>
                            ) : (
                                <div className="p-4 bg-gray-50 border border-gray-200 text-center mb-8">
                                    <p className="font-bold text-gray-500 uppercase tracking-wider">Stok Habis</p>
                                </div>
                            )}

                            {/* Tabs (Desc, Spec) */}
                            <div className="border-t border-gray-200 pt-6 mt-2">
                                <div className="flex gap-8 border-b border-gray-200 mb-6">
                                    <button onClick={() => setActiveTab('desc')} className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'desc' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-gray-900'}`}>Deskripsi</button>
                                    <button onClick={() => setActiveTab('spec')} className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'spec' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-gray-900'}`}>Spesifikasi</button>
                                </div>
                                
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    {activeTab === 'desc' && (
                                        <p>{product.description || 'Koleksi premium dari GHEVERHAN yang dirancang untuk kenyamanan dan gaya elegan setiap hari. Dibuat dengan bahan berkualitas tinggi dan jahitan presisi.'}</p>
                                    )}
                                    {activeTab === 'spec' && (
                                        <ul className="list-disc pl-4 space-y-2">
                                            <li>Material: Premium Cotton</li>
                                            <li>Fit: Regular Fit</li>
                                            <li>Care: Machine wash cold, do not bleach</li>
                                            <li>SKU: {defaultVariant?.sku || 'GHV-001'}</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-24">
                            <h2 className="text-2xl font-bold font-heading mb-8 text-center">Mungkin Anda Suka</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {relatedProducts.map(p => (
                                    <ProductCard key={p.id} product={p} onAddToCart={(prod) => {
                                        if (prod.variants && prod.variants.length > 0) addItem(prod, prod.variants[0]);
                                    }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            {stock > 0 && (
                <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center gap-3 md:hidden z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <Button
                        variant="outline"
                        className="h-12 w-12 flex items-center justify-center border-gray-300"
                        onClick={() => { handleAddToCart(); toggleCart(); }}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                    <Button className="h-12 flex-1 font-bold uppercase tracking-wider" onClick={handleBuyNow}>
                        Beli Sekarang
                    </Button>
                </div>
            )}
        </>
    );
}
