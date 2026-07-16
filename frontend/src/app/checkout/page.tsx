'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { checkoutService, CheckoutPayload } from '@/services/checkout.service';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        customer_name: '',
        customer_email: '',
        shipping_address: '',
        shipping_method: 'regular',
        payment_method: 'bank_transfer',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload: CheckoutPayload = {
                ...form,
                items: items.map(item => ({
                    variant_id: item.variant.id as number,
                    quantity: item.quantity
                }))
            };

            const response = await checkoutService.placeOrder(payload);
            clearCart();
            router.push(`/checkout/success?order_number=${response.order_number}`);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 p-12 text-center">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <Button onClick={() => router.push('/')}>Return to Shop</Button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Checkout Form */}
                        <div className="flex-1">
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                                
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Full Name</label>
                                            <input 
                                                required
                                                name="customer_name"
                                                value={form.customer_name}
                                                onChange={handleChange}
                                                className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email</label>
                                            <input 
                                                required
                                                type="email"
                                                name="customer_email"
                                                value={form.customer_email}
                                                onChange={handleChange}
                                                className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Full Address</label>
                                        <textarea 
                                            required
                                            name="shipping_address"
                                            value={form.shipping_address}
                                            onChange={handleChange}
                                            className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none h-24"
                                            placeholder="Street, City, Postal Code"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Shipping Method (Dummy)</label>
                                            <select 
                                                name="shipping_method" 
                                                value={form.shipping_method}
                                                onChange={handleChange}
                                                className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                            >
                                                <option value="regular">Regular (2-3 Days) - Free</option>
                                                <option value="express">Express (1 Day) - Rp 20.000</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Payment Method (Dummy)</label>
                                            <select 
                                                name="payment_method" 
                                                value={form.payment_method}
                                                onChange={handleChange}
                                                className="w-full border p-2 rounded focus:ring-2 focus:ring-primary outline-none"
                                            >
                                                <option value="bank_transfer">Bank Transfer (Manual)</option>
                                                <option value="cod">Cash on Delivery</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96">
                            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                
                                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                                    {items.map(item => (
                                        <div key={item.variant.id} className="flex gap-4">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium line-clamp-1">{item.product.name}</h4>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-sm font-medium">
                                                Rp {(item.variant.price * item.quantity).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="border-t pt-4 space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Shipping</span>
                                        <span>Rp 0</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total</span>
                                        <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                                    </div>
                                </div>

                                <Button 
                                    form="checkout-form"
                                    type="submit" 
                                    className="w-full" 
                                    size="lg"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
