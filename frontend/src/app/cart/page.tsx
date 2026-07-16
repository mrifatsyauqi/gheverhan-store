'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ArrowRight, Tag } from 'lucide-react';

export default function CartPage() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-gray-50" />;
    }

    const subtotal = getTotalPrice();
    const shipping = 0; // Free shipping dummy
    const total = subtotal + shipping;

    return (
        <>
            <Navbar />
            
            <div className="min-h-screen bg-gray-50 py-8 pb-24 md:pb-16">
                <div className="max-w-7xl mx-auto px-4">
                    
                    <h1 className="text-3xl font-bold font-heading mb-8">Keranjang Belanja</h1>

                    {items.length === 0 ? (
                        <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-10 h-10 text-gray-300" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Keranjang Anda Kosong</h2>
                            <p className="text-gray-500 mb-8">Temukan produk menarik dan tambahkan ke keranjang Anda.</p>
                            <Link href="/products">
                                <Button size="lg" className="px-8 uppercase tracking-wider font-bold">
                                    Mulai Belanja
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Items List */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white p-4 md:p-6 rounded-none md:rounded-xl border border-gray-100 shadow-sm">
                                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        <div className="col-span-6">Produk</div>
                                        <div className="col-span-3 text-center">Jumlah</div>
                                        <div className="col-span-3 text-right">Subtotal</div>
                                    </div>
                                    
                                    <div className="divide-y divide-gray-100">
                                        {items.map((item) => (
                                            <div key={`${item.product.id}-${item.variant.id}`} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center">
                                                
                                                {/* Mobile & Desktop: Product Info */}
                                                <div className="col-span-6 flex gap-4 w-full">
                                                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0 relative">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img 
                                                            src={item.product.seo_metadata?.og_image || 'https://via.placeholder.com/150'} 
                                                            alt={item.product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 flex flex-col justify-center">
                                                        <Link href={`/products/${item.product.slug}`} className="font-bold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                                                            {item.product.name}
                                                        </Link>
                                                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">SKU: {item.variant.sku}</p>
                                                        
                                                        {/* Mobile Price */}
                                                        <div className="md:hidden mt-2 font-bold text-primary">
                                                            Rp {Number(item.variant.price).toLocaleString('id-ID')}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Desktop & Mobile: Quantity */}
                                                <div className="col-span-3 flex justify-between md:justify-center items-center w-full md:w-auto mt-4 md:mt-0">
                                                    <div className="flex items-center border border-gray-300">
                                                        <button 
                                                            onClick={() => updateQuantity(item.product.id, item.variant.id, Math.max(1, item.quantity - 1))}
                                                            className="p-2 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.product.id, item.variant.id, Math.min(item.variant.stock, item.quantity + 1))}
                                                            className="p-2 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Mobile Remove */}
                                                    <button 
                                                        onClick={() => removeItem(item.product.id, item.variant.id)}
                                                        className="md:hidden p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Desktop: Subtotal & Remove */}
                                                <div className="col-span-3 hidden md:flex flex-col items-end gap-2 w-full text-right">
                                                    <div className="font-bold text-primary">
                                                        Rp {(Number(item.variant.price) * item.quantity).toLocaleString('id-ID')}
                                                    </div>
                                                    <button 
                                                        onClick={() => removeItem(item.product.id, item.variant.id)}
                                                        className="text-xs text-gray-400 hover:text-red-500 underline transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-none md:rounded-xl border border-gray-100 shadow-sm sticky top-24">
                                    <h2 className="text-lg font-bold font-heading mb-6 border-b border-gray-100 pb-4">Ringkasan Pesanan</h2>
                                    
                                    <div className="space-y-4 text-sm mb-6 border-b border-gray-100 pb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({items.length} produk)</span>
                                            <span className="font-medium text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Estimasi Ongkos Kirim</span>
                                            <span className="font-medium text-green-600">Gratis</span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Kode Voucher" 
                                                    value={voucherCode}
                                                    onChange={(e) => setVoucherCode(e.target.value)}
                                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded focus:ring-primary focus:border-primary text-sm uppercase"
                                                />
                                            </div>
                                            <Button variant="outline" className="font-bold">Pakai</Button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-6">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
                                    </div>

                                    <Button 
                                        size="lg" 
                                        className="w-full font-bold uppercase tracking-wider"
                                        onClick={() => router.push('/checkout')}
                                    >
                                        Lanjut ke Pembayaran <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                    
                                    <div className="mt-4 text-center">
                                        <p className="text-[10px] text-gray-400">Pajak & ongkos kirim dihitung pada saat checkout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
