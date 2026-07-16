'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { CheckCircle2, Copy } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order_number') || 'Unknown';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-4 py-12">
                <div className="bg-white p-8 md:p-12 rounded-none md:rounded-xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 className="w-16 h-16 text-primary" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-2xl font-bold font-heading mb-2">Pesanan Berhasil Dibuat!</h1>
                    <p className="text-gray-500 mb-8 text-sm">Terima kasih telah berbelanja di GHEVERHAN.</p>
                    
                    <div className="bg-primary/5 p-6 rounded-none mb-8 border border-primary/20">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Nomor Pesanan</p>
                        <div className="flex items-center justify-center gap-3">
                            <p className="text-2xl font-mono font-bold text-primary">{orderNumber}</p>
                            <button className="text-gray-400 hover:text-primary transition-colors">
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-8 space-y-4 text-left bg-gray-50 p-4 border border-gray-100">
                        <p className="font-bold">Instruksi Pembayaran Manual:</p>
                        <p>Silakan lakukan transfer sesuai total tagihan ke rekening berikut:</p>
                        <div className="bg-white p-3 border border-gray-200 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-900">BCA</p>
                                <p className="font-mono text-primary font-bold">1234 5678 90</p>
                                <p className="text-xs text-gray-500">a/n PT Gheverhan Fashion</p>
                            </div>
                            <button className="text-gray-400 hover:text-primary transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">Pesanan akan dibatalkan otomatis jika pembayaran tidak dilakukan dalam 1x24 jam.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/account/orders">
                            <Button size="lg" className="w-full font-bold uppercase tracking-wider h-12">
                                Lacak Pesanan
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button variant="outline" size="lg" className="w-full font-bold uppercase tracking-wider h-12">
                                Kembali Belanja
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
