import React from 'react';

export interface HeroSectionProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
}

export function HeroSection({ title, subtitle, backgroundImage, ctaText, ctaLink }: HeroSectionProps) {
    return (
        <section 
            className="relative flex flex-col items-center justify-center min-h-[60vh] bg-cover bg-center text-center p-8"
            style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundColor: 'var(--theme-primary, #000)' }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-white max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                {subtitle && <p className="text-xl md:text-2xl mb-8">{subtitle}</p>}
                {ctaText && ctaLink && (
                    <a href={ctaLink} className="inline-block bg-white text-black font-semibold px-8 py-3 rounded hover:bg-gray-200 transition">
                        {ctaText}
                    </a>
                )}
            </div>
        </section>
    );
}
