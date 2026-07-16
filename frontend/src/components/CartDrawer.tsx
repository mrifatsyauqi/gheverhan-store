'use client';

import React from 'react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
    const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={toggleCart}
            />
            
            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col transform transition-transform">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <Button variant="ghost" size="icon" onClick={toggleCart}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.variant.id} className="flex gap-4 border-b pb-4">
                                <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={item.product.seo_metadata?.og_image || 'https://via.placeholder.com/100?text=No+Img'} 
                                        alt={item.product.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm line-clamp-2">{item.product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">Rp {Number(item.variant.price).toLocaleString('id-ID')}</p>
                                    
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border rounded">
                                            <button 
                                                className="px-2 py-1 hover:bg-gray-100 disabled:opacity-50"
                                                onClick={() => updateQuantity(item.variant.id as number, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-2 text-sm">{item.quantity}</span>
                                            <button 
                                                className="px-2 py-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.variant.id as number, item.quantity + 1)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-auto h-8 w-8"
                                            onClick={() => removeItem(item.variant.id as number)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                <div className="border-t p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-4 font-bold text-lg">
                        <span>Total</span>
                        <span>Rp {getTotalPrice().toLocaleString('id-ID')}</span>
                    </div>
                    <Button 
                        className="w-full" 
                        size="lg"
                        disabled={items.length === 0}
                        onClick={() => {
                            toggleCart();
                            router.push('/checkout');
                        }}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );
}
