import React from 'react';
import Link from 'next/link';

export default function Hero({ data }) {
    return (
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                    {data.title}
                </h1>
                {data.subtitle && (
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {data.subtitle}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {data.ctaText && data.ctaLink && (
                        <Link
                            href={data.ctaLink}
                            className="bg-[#008000] text-white px-8 py-3 rounded-full font-bold hover:bg-[#006600] transition-colors"
                        >
                            {data.ctaText}
                        </Link>
                    )}
                </div>
            </div>
            {/* Optional Background Image Overlay could go here */}
            {data.image && (
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src={data.image} alt="" className="w-full h-full object-cover" />
                </div>
            )}
        </section>
    );
}
