'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { CheckCircle2 } from 'lucide-react';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order_number') || 'Unknown';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg text-center max-w-lg w-full border">
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 className="w-20 h-20 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-6">Thank you for shopping with GHEVERHAN.</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-dashed border-gray-300">
                        <p className="text-sm text-gray-500 mb-1">Your Order Number</p>
                        <p className="text-xl font-mono font-bold text-primary">{orderNumber}</p>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-8">
                        We have received your order and it is currently marked as <strong>Pending Payment</strong>. 
                        Since this is an MVP, no actual payment is required.
                    </p>

                    <Button onClick={() => router.push('/')} size="lg" className="w-full">
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
