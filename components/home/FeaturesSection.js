"use client";

import React from 'react';
import { Zap, Shield, Globe, Code2, Database, Cpu } from 'lucide-react';

const features = [
    {
        icon: <Zap size={24} className="text-yellow-400" />,
        title: "Instant Solutions",
        description: "Stop wasting hours on StackOverflow. Get direct, verified fixes for your specific error logs instantly."
    },
    {
        icon: <Shield size={24} className="text-emerald-400" />,
        title: "Verified by Experts",
        description: "Every solution in our database is peer-reviewed by senior architects to ensure best practices and security."
    },
    {
        icon: <Database size={24} className="text-blue-400" />,
        title: "Universal Knowledge Base",
        description: "From React hydration errors to Rust borrow checker issues—we cover the entire stack."
    },
    {
        icon: <Code2 size={24} className="text-purple-400" />,
        title: "Copy-Paste Ready",
        description: "Clean, formatted code snippets that you can drop directly into your project with zero friction."
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                        Why Developers Choose <span className="text-indigo-500">DevFixer</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        We're building the operating system for debugging. A platform designed to help you ship faster and break fewer things.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10">
                            <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
