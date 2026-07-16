'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
    const { items, getTotalPrice } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const [form, setForm] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        city: '',
        postal_code: '',
        shipping_method: 'regular',
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContinueToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Save form data to session storage for dummy payment page to use
        sessionStorage.setItem('checkout_data', JSON.stringify(form));
        
        router.push('/checkout/payment');
    };

    if (!mounted) return <div className="min-h-screen bg-gray-50" />;

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold font-heading mb-4">Keranjang Kosong</h1>
                    <p className="text-gray-500 mb-8">Anda belum memilih produk untuk dicheckout.</p>
                    <Link href="/products">
                        <Button className="px-8 uppercase tracking-wider font-bold">Kembali Belanja</Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8 pb-24 md:pb-16">
                <div className="max-w-7xl mx-auto px-4">
                    
                    {/* Breadcrumb / Steps */}
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-8 overflow-x-auto pb-2">
                        <Link href="/cart" className="text-gray-500 hover:text-primary whitespace-nowrap">Keranjang</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-primary whitespace-nowrap">Pengiriman</span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-300 whitespace-nowrap">Pembayaran</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Form */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            <form id="checkout-form" onSubmit={handleContinueToPayment} className="space-y-6">
                                {/* Contact Info */}
                                <div className="bg-white p-6 md:p-8 rounded-none md:rounded-xl border border-gray-100 shadow-sm">
                                    <h2 className="text-lg font-bold font-heading mb-6 border-b border-gray-100 pb-4">Informasi Kontak</h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nama Lengkap</label>
                                                <input 
                                                    required
                                                    name="customer_name"
                                                    value={form.customer_name}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                                                    placeholder="Masukkan nama lengkap"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Nomor Telepon</label>
                                                <input 
                                                    required
                                                    type="tel"
                                                    name="customer_phone"
                                                    value={form.customer_phone}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                                                    placeholder="Contoh: 08123456789"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                                            <input 
                                                required
                                                type="email"
                                                name="customer_email"
                                                value={form.customer_email}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                                                placeholder="Untuk pengiriman invoice"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-white p-6 md:p-8 rounded-none md:rounded-xl border border-gray-100 shadow-sm">
                                    <h2 className="text-lg font-bold font-heading mb-6 border-b border-gray-100 pb-4">Alamat Pengiriman</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Alamat Lengkap</label>
                                            <textarea 
                                                required
                                                name="shipping_address"
                                                value={form.shipping_address}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors h-24 text-sm"
                                                placeholder="Nama jalan, gedung, no. rumah, dll."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Kota / Kabupaten</label>
                                                <input 
                                                    required
                                                    name="city"
                                                    value={form.city}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Kode Pos</label>
                                                <input 
                                                    required
                                                    name="postal_code"
                                                    value={form.postal_code}
                                                    onChange={handleChange}
                                                    className="w-full border border-gray-300 rounded p-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Method */}
                                <div className="bg-white p-6 md:p-8 rounded-none md:rounded-xl border border-gray-100 shadow-sm">
                                    <h2 className="text-lg font-bold font-heading mb-6 border-b border-gray-100 pb-4">Metode Pengiriman</h2>
                                    
                                    <div className="space-y-3">
                                        <label className={`block border p-4 rounded cursor-pointer transition-colors ${form.shipping_method === 'regular' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <input 
                                                        type="radio" 
                                                        name="shipping_method" 
                                                        value="regular"
                                                        checked={form.shipping_method === 'regular'}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-sm">Reguler</div>
                                                        <div className="text-xs text-gray-500 mt-1">Estimasi 2-4 Hari Kerja</div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-sm">Gratis</div>
                                            </div>
                                        </label>

                                        <label className={`block border p-4 rounded cursor-pointer transition-colors ${form.shipping_method === 'express' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <input 
                                                        type="radio" 
                                                        name="shipping_method" 
                                                        value="express"
                                                        checked={form.shipping_method === 'express'}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-primary focus:ring-primary"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-sm">Express</div>
                                                        <div className="text-xs text-gray-500 mt-1">Estimasi 1-2 Hari Kerja</div>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-sm">Rp 20.000</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-white p-6 md:p-8 rounded-none md:rounded-xl border border-gray-100 shadow-sm sticky top-24">
                                <h2 className="text-lg font-bold font-heading mb-6 border-b border-gray-100 pb-4">Ringkasan Pesanan</h2>
                                
                                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                                    {items.map(item => (
                                        <div key={item.variant.id} className="flex gap-4">
                                            <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img 
                                                    src={item.product.seo_metadata?.og_image || 'https://via.placeholder.com/150'} 
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="text-sm font-medium line-clamp-1">{item.product.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1">SKU: {item.variant.sku} | Qty: {item.quantity}</p>
                                                <div className="text-sm font-bold mt-1">
                                                    Rp {(item.variant.price * item.quantity).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t border-gray-100 pt-6 space-y-3 mb-6">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Ongkos Kirim</span>
                                        <span className="font-medium text-gray-900">
                                            {form.shipping_method === 'express' ? 'Rp 20.000' : 'Gratis'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-100">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            Rp {(getTotalPrice() + (form.shipping_method === 'express' ? 20000 : 0)).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <Button 
                                    form="checkout-form"
                                    type="submit" 
                                    className="w-full font-bold uppercase tracking-wider h-12" 
                                >
                                    Lanjut ke Pembayaran <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                                
                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Informasi Anda aman dan terenkripsi.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
