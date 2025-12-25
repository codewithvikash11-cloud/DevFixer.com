"use client";

import React from 'react';
import { Search, BookOpen, CheckCircle } from 'lucide-react';

const steps = [
    {
        icon: <Search size={32} />,
        title: "Search Your Error",
        description: "Paste your console error or stack trace directly into our intelligent search engine.",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: <BookOpen size={32} />,
        title: "Review the Fix",
        description: "Get a verified, step-by-step solution explained clearly with code examples.",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        icon: <CheckCircle size={32} />,
        title: "Resolve Instantly",
        description: "Apply the fix, learn the 'why' behind it, and prevent it from happening again.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    }
];

const HowItWorksSection = () => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] relative">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <span className="text-xs font-black tracking-widest uppercase text-indigo-500 mb-4 block">Workflow</span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                        From Panic to <span className="text-indigo-500">Production</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-indigo-500/20 to-gray-200 dark:from-white/5 dark:via-white/10 dark:to-white/5 z-0" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                            <div className={`w-24 h-24 ${step.bg} ${step.color} rounded-3xl flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-xl border border-white/10`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                                {step.description}
                            </p>

                            {/* Step Number Badge */}
                            <div className="absolute top-0 right-[25%] md:right-[30%] w-8 h-8 bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center text-xs font-black text-gray-400">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
