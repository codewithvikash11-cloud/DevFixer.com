"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import AuroraBackground from '@/components/hero/AuroraBackground';
import CTASection from '@/components/home/CTASection';
import { Globe, Zap, Server, Shield, Activity, Map } from 'lucide-react';

export default function GlobalCDNPage() {
    return (
        <LayoutWrapper>

            {/* HERO SECTION */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-background">
                <AuroraBackground />
                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center pt-20">

                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface border border-border/50 shadow-sm backdrop-blur-sm mb-6 animate-float-slow">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase text-text-secondary">Network Status: Operational</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-6">
                        Solutions at the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse-glow">Edge.</span>
                    </h1>

                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                        DevFixer distributes verified patches across 300+ PoPs worldwide. <br />
                        Latency so low, it feels like the fix was already on your machine.
                    </p>
                </div>
            </section>

            {/* VISUAL MAP SECTION */}
            <section className="py-20 bg-[#020617] relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-[url('/dotted-map.svg')] opacity-20 bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Ultra-Low Latency Infrastructure</h2>
                            <div className="space-y-6">
                                <StatRow label="Global PoPs" value="320+" />
                                <StatRow label="Mean Latency" value="< 15ms" />
                                <StatRow label="Uptime SLA" value="99.99%" />
                            </div>
                        </div>

                        {/* Abstract Globe/Network Visual */}
                        <div className="relative h-[400px] w-full flex items-center justify-center">
                            <div className="w-[300px] h-[300px] rounded-full border border-blue-500/30 animate-[spin_60s_linear_infinite] relative">
                                <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/20 animate-[spin_40s_linear_infinite_reverse]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,1)] animate-pulse" />

                                {/* Orbiting "PoPs" */}
                                <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan] animate-float" />
                                <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_purple] animate-float-slow" />
                            </div>
                            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 bg-surface border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Zap className="text-yellow-400" />}
                            title="Instant Invalidation"
                            desc="When a fix is updated, it propagates globally in under 200ms."
                        />
                        <FeatureCard
                            icon={<Server className="text-blue-400" />}
                            title="Edge Compute"
                            desc="We process stack traces on the edge to strip PII before it hits our core."
                        />
                        <FeatureCard
                            icon={<Shield className="text-green-400" />}
                            title="DDoS Protection"
                            desc="Enterprise-grade shielding ensures the library is always available."
                        />
                    </div>
                </div>
            </section>

            <CTASection />
        </LayoutWrapper>
    );
}

const StatRow = ({ label, value }) => (
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-gray-400 font-medium">{label}</span>
        <span className="text-2xl font-mono font-bold text-blue-400">{value}</span>
    </div>
);

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-background border border-border transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="w-12 h-12 bg-surface-highlight rounded-xl flex items-center justify-center mb-4 text-text-primary">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{desc}</p>
    </div>
);
