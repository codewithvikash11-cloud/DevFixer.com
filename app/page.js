"use client";

import React from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import CodeBlock from '@/components/CodeBlock';
import {
    FileJson,
    Code2,
    Layout,
    Palette,
    Server,
    Atom,
    Database,
    GitBranch,
    Terminal,
    Zap,
    Shield,
    Search,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const languages = [
    { name: 'JavaScript', icon: FileJson, color: 'text-yellow-400', slug: 'javascript' },
    { name: 'Python', icon: Code2, color: 'text-blue-400', slug: 'python' },
    { name: 'HTML', icon: Layout, color: 'text-orange-400', slug: 'html' },
    { name: 'CSS', icon: Palette, color: 'text-blue-500', slug: 'css' },
    { name: 'Node.js', icon: Server, color: 'text-green-500', slug: 'nodejs' },
    { name: 'React', icon: Atom, color: 'text-cyan-400', slug: 'react' },
    { name: 'SQL', icon: Database, color: 'text-indigo-400', slug: 'sql' },
    { name: 'Git', icon: GitBranch, color: 'text-orange-600', slug: 'git' },
];

const homeCode = `// Debugging a common error
function solveIssue(error) {
  if (error.type === 'ReferenceError') {
    return "Check if the variable is defined before usage.";
  }
  
  return "DevFixer can help you find a tailored solution.";
}

// Search for thousands of solutions instantly
const result = solveIssue({ type: 'ReferenceError' });
console.log(result);`;

export default function Home() {
    return (
        <LayoutWrapper>
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-blue/10 blur-[80px] md:blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-accent-purple/10 blur-[70px] md:blur-[100px] rounded-full"></div>

                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded-full text-accent-blue text-xs font-semibold mb-6 animate-pulse">
                        <Zap size={14} className="fill-current" />
                        <span>Production-Grade Platform</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Fix errors <span className="text-accent-blue bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">faster</span> than ever.
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                        The ultimate developer workspace for debugging. Search error codes,
                        paste stack traces, and get production-quality solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
                        <Link href="/editor" className="w-full sm:w-auto px-8 py-4 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-accent-blue/20 flex items-center justify-center space-x-2 active:scale-95">
                            <Terminal size={20} />
                            <span>Open Editor</span>
                        </Link>
                        <Link href="/errors" className="w-full sm:w-auto px-8 py-4 bg-panel border border-border hover:border-accent-blue/50 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 active:scale-95">
                            <Search size={20} />
                            <span>Browse Fixes</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 transform hover:scale-[1.01] transition-transform duration-500 hidden md:block">
                    <CodeBlock code={homeCode} language="javascript" fileName="solution_helper.js" />
                </div>
            </section>

            {/* Languages Grid */}
            <section className="py-16 md:py-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Technologies</h2>
                    <p className="text-text-secondary">Comprehensive guides for the modern tech stack</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
                    {languages.map((lang) => (
                        <Link
                            key={lang.slug}
                            href={`/languages/${lang.slug}`}
                            className="group p-6 md:p-8 bg-panel border border-border rounded-2xl hover:border-accent-blue/50 hover:shadow-2xl hover:shadow-accent-blue/5 transition-all flex flex-col items-center text-center transform hover:-translate-y-1 active:scale-95"
                        >
                            <div className={`p-4 rounded-xl bg-background border border-border group-hover:border-accent-blue/30 transition-colors mb-4`}>
                                <lang.icon size={32} className={`md:w-10 md:h-10 ${lang.color} group-hover:scale-110 transition-transform`} />
                            </div>
                            <h3 className="font-bold text-lg">{lang.name}</h3>
                            <div className="mt-2 text-xs font-semibold text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                                <span>View errors</span>
                                <ArrowRight size={12} />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 md:py-24 border-t border-border/50 bg-panel/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-6">
                    <div className="group p-8 bg-background border border-border rounded-3xl hover:border-accent-blue/30 transition-all">
                        <div className="w-14 h-14 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue mb-8 group-hover:rotate-6 transition-transform">
                            <Search size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">1. Search or Paste</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Find solutions by searching for error codes or simply paste your entire stack trace into our workspace.
                        </p>
                    </div>
                    <div className="group p-8 bg-background border border-border rounded-3xl hover:border-accent-purple/30 transition-all">
                        <div className="w-14 h-14 bg-accent-purple/10 rounded-2xl flex items-center justify-center text-accent-purple mb-8 group-hover:rotate-6 transition-transform">
                            <Terminal size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">2. Analyze Context</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Our structured solutions provide line-by-line explanations of why the error occurred in your specific context.
                        </p>
                    </div>
                    <div className="group p-8 bg-background border border-border rounded-3xl hover:border-accent-green/30 transition-all">
                        <div className="w-14 h-14 bg-accent-green/10 rounded-2xl flex items-center justify-center text-accent-green mb-8 group-hover:rotate-6 transition-transform">
                            <Shield size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">3. Fix Permanently</h3>
                        <p className="text-text-secondary leading-relaxed">
                            Go beyond copy-pasting. Learn best practices and architectural adjustments to prevent similar issues.
                        </p>
                    </div>
                </div>
            </section>

            {/* Latest Fixes */}
            <section className="py-16 md:py-24 px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Latest community fixes</h2>
                        <p className="text-text-secondary">Updated real-time by senior engineers</p>
                    </div>
                    <Link href="/errors" className="inline-flex items-center space-x-2 text-accent-blue hover:underline font-bold transition-all px-4 py-2 bg-accent-blue/5 rounded-lg border border-accent-blue/10">
                        <span>View All Documentation</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Link key={i} href="/errors/typeerror-map" className="p-6 bg-panel border border-border rounded-2xl hover:border-accent-blue/30 transition-all cursor-pointer group hover:shadow-xl hover:shadow-accent-blue/5">
                            <div className="flex items-start justify-between mb-4">
                                <span className="px-2 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-bold rounded uppercase tracking-wider">JavaScript</span>
                                <span className="text-xs text-text-secondary font-mono">Dec 20, 2025</span>
                            </div>
                            <h4 className="text-xl font-bold group-hover:text-accent-blue transition-colors mb-3 leading-tight underline-offset-4 decoration-accent-blue/30 group-hover:underline">Uncaught TypeError: Cannot read property 'map' of undefined</h4>
                            <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                                This error typically occurs when you're trying to call the .map() method on a variable that hasn't been initialized as an array...
                            </p>
                            <div className="mt-6 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-xs font-bold text-accent-blue">Read full solution</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </LayoutWrapper>
    );
}
