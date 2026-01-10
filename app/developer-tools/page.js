"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import Link from 'next/link';
import { Hammer, Github, FileText, ArrowUpRight, Star, GitFork, Users } from 'lucide-react';

export default function DeveloperToolsPage() {
    return (
        <LayoutWrapper>
            <div className="min-h-screen bg-black pb-20 pt-24">
                <div className="container mx-auto px-4 max-w-5xl">

                    {/* Header */}
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold mb-6">
                            <Hammer size={12} />
                            <span>Career Utilities</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Toolkit</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg">
                            Tools to analyze your online presence, optimize your resume, and benchmark your GitHub profile.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* GitHub Analyzer Card */}
                        <div className="group relative bg-[#0f172a] border border-[#334155] rounded-3xl p-8 hover:border-accent-primary/50 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Github size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-accent-primary/10 rounded-2xl flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 transition-transform">
                                    <Github size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">GitHub Profile Analyzer</h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Get a detailed report on your commit history, language usage, and repo popularity. Improve your open source brand.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Star size={16} className="text-yellow-500" /> Repo Star Analysis
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Users size={16} className="text-purple-500" /> Follower Growth
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <GitFork size={16} className="text-green-500" /> Fork Impact
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-[#1e293b] hover:bg-accent-primary text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:bg-accent-primary">
                                    Analyze Profile <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Resume Analyzer Card */}
                        <div className="group relative bg-[#0f172a] border border-[#334155] rounded-3xl p-8 hover:border-green-500/50 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileText size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Resume ATS Scorer</h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Check if your resume passes Applicant Tracking Systems. Get keyword suggestions and formatting fixes.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center text-[8px] font-bold text-green-500">95</div> ATS Compatibility Score
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <div className="w-4 h-4 rounded bg-accent-primary/20 border border-accent-primary/50 flex items-center justify-center text-[8px] font-bold text-accent-primary">KW</div> Keyword Cloud
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50 flex items-center justify-center text-[8px] font-bold text-red-500">FX</div> Formatting Fixer
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-[#1e293b] hover:bg-green-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:bg-green-600">
                                    Upload Resume <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
