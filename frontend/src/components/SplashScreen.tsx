'use client';

import React, { useEffect, useState } from 'react';

export function SplashScreen() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000); // 2 seconds splash
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-500 animate-out fade-out fill-mode-forwards" style={{ animationDelay: '1.5s' }}>
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
                <h1 className="text-5xl font-bold font-heading tracking-tighter mb-4">GH</h1>
                <h2 className="text-xl font-heading tracking-widest uppercase">GHEVERHAN</h2>
                <p className="text-xs text-gray-500 tracking-widest mt-2 uppercase">Premium Fashion Store</p>
                <div className="mt-8 w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-[pulse_1s_ease-in-out_infinite] w-full origin-left" />
                </div>
            </div>
        </div>
    );
}
