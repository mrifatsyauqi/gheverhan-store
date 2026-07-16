'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { checkoutService, CheckoutPayload } from '@/services/checkout.service';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ChevronRight, CreditCard, Landmark, Wallet } from 'lucide-react';

export default function PaymentPage() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('bca');
    const [checkoutData, setCheckoutData] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        const data = sessionStorage.getItem('checkout_data');
        if (data) {
            setCheckoutData(JSON.parse(data));
        } else {
            router.push('/checkout');
        }
    }, [router]);

    if (!mounted || !checkoutData) return <div className="min-h-screen bg-gray-50" />;

    const shippingCost = checkoutData.shipping_method === 'express' ? 20000 : 0;
    const totalAmount = getTotalPrice() + shippingCost;

    const handleConfirmPayment = async () => {
        setLoading(true);
        try {
            const payload: CheckoutPayload = {
                ...checkoutData,
                payment_method: paymentMethod,
                items: items.map(item => ({
                    variant_id: item.variant.id as number,
                    quantity: item.quantity
                }))
            };

            const response = await checkoutService.placeOrder(payload);
            clearCart();
            sessionStorage.removeItem('checkout_data');
            router.push(`/checkout/success?order_number=${response.order_number}`);
        } catch (err: any) {
            console.error(err);
            const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat memproses pesanan.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-8 pb-24 md:pb-16">
                <div className="max-w-3xl mx-auto px-4">
                    
                    {/* Breadcrumb / Steps */}
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-8 overflow-x-auto pb-2 justify-center">
                        <Link href="/cart" className="text-gray-500 hover:text-primary whitespace-nowrap">Keranjang</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <Link href="/checkout" className="text-gray-500 hover:text-primary whitespace-nowrap">Pengiriman</Link>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                        <span className="text-primary whitespace-nowrap">Pembayaran</span>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-none md:rounded-xl border border-gray-100 shadow-sm mb-6">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold font-heading mb-2">Pilih Metode Pembayaran</h1>
                            <p className="text-gray-500 text-sm">Silakan pilih bank untuk transfer manual.</p>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <label className={`block border p-4 rounded cursor-pointer transition-colors ${paymentMethod === 'bca' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="bca"
                                            checked={paymentMethod === 'bca'}
                                            onChange={() => setPaymentMethod('bca')}
                                            className="w-4 h-4 text-primary focus:ring-primary"
                                        />
                                        <Landmark className="w-6 h-6 text-blue-600" />
                                        <div>
                                            <div className="font-bold text-sm">Transfer Bank BCA</div>
                                            <div className="text-xs text-gray-500 mt-1">Dicek manual (1x24 jam)</div>
                                        </div>
                                    </div>
                                </div>
                            </label>

                            <label className={`block border p-4 rounded cursor-pointer transition-colors ${paymentMethod === 'mandiri' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            value="mandiri"
                                            checked={paymentMethod === 'mandiri'}
                                            onChange={() => setPaymentMethod('mandiri')}
                                            className="w-4 h-4 text-primary focus:ring-primary"
                                        />
                                        <Landmark className="w-6 h-6 text-yellow-500" />
                                        <div>
                                            <div className="font-bold text-sm">Transfer Bank Mandiri</div>
                                            <div className="text-xs text-gray-500 mt-1">Dicek manual (1x24 jam)</div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-900">Total Pembayaran</span>
                                <span className="text-2xl font-bold text-primary">Rp {totalAmount.toLocaleString('id-ID')}</span>
                            </div>
                            
                            <Button 
                                onClick={handleConfirmPayment}
                                className="w-full font-bold uppercase tracking-wider h-12" 
                                disabled={loading}
                            >
                                {loading ? 'Memproses...' : 'Konfirmasi & Buat Pesanan'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
