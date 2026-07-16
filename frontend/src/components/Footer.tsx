import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, HeadphonesIcon, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full bg-white flex flex-col mt-auto border-t border-gray-100">
            {/* Trust Badges - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:block border-b border-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-4 gap-4 text-center divide-x divide-gray-100">
                        <div className="flex flex-col items-center justify-center space-y-2 px-4">
                            <Truck className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                            <h4 className="font-bold text-sm">Gratis Ongkir</h4>
                            <p className="text-xs text-gray-500">Dikirim setiap hari</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2 px-4">
                            <ShieldCheck className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                            <h4 className="font-bold text-sm">Garansi 100%</h4>
                            <p className="text-xs text-gray-500">Produk original</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2 px-4">
                            <CreditCard className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                            <h4 className="font-bold text-sm">Pembayaran Aman</h4>
                            <p className="text-xs text-gray-500">Transaksi terenkripsi</p>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2 px-4">
                            <HeadphonesIcon className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                            <h4 className="font-bold text-sm">Customer Service</h4>
                            <p className="text-xs text-gray-500">Siap melayani 24/7</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="bg-[#111111] text-white pt-12 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                        {/* Brand Info */}
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/" className="text-2xl font-bold tracking-tighter font-heading mb-4 inline-block">
                                GHEVERHAN
                            </Link>
                            <p className="text-sm text-gray-400 mb-6 max-w-sm">
                                PREMIUM FASHION STORE
                                <br/><br/>
                                Desain modern, elegan, dan mobile-first untuk pengalaman belanja yang premium. Elevate Your Everyday Style.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Help Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-4 font-heading">Bantuan</h3>
                            <ul className="space-y-3">
                                <li><Link href="/pages/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link href="/pages/how-to-buy" className="text-sm text-gray-400 hover:text-white transition-colors">Cara Belanja</Link></li>
                                <li><Link href="/pages/shipping" className="text-sm text-gray-400 hover:text-white transition-colors">Pengiriman</Link></li>
                                <li><Link href="/pages/payment" className="text-sm text-gray-400 hover:text-white transition-colors">Pembayaran</Link></li>
                                <li><Link href="/pages/returns" className="text-sm text-gray-400 hover:text-white transition-colors">Retur & Refund</Link></li>
                            </ul>
                        </div>

                        {/* About Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-4 font-heading">Tentang Kami</h3>
                            <ul className="space-y-3">
                                <li><Link href="/pages/about" className="text-sm text-gray-400 hover:text-white transition-colors">Tentang GHEVERHAN</Link></li>
                                <li><Link href="/pages/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                                <li><Link href="/pages/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                                <li><Link href="/pages/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Kontak Kami</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pb-20 md:pb-0">
                        <p>© {new Date().getFullYear()} GHEVERHAN. All rights reserved.</p>
                        <div className="mt-4 md:mt-0 space-x-4">
                            <span>IDR - Indonesia</span>
                            <span>Bahasa Indonesia</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
