"use client";

import React from 'react';
import Link from 'next/link';
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    Heart,
    ArrowRight,
    Command,
    Terminal,
    Cpu
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="lg:pl-16 bg-panel border-t border-border relative overflow-hidden">
            {/* Creative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green opacity-50" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-background border border-border rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Terminal size={32} className="text-accent-blue" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter uppercase">Dev<span className="text-accent-blue">Fixer</span></h2>
                                    <p className="text-[10px] font-mono text-text-secondary tracking-[0.3em] uppercase">Debug. Commit. Deploy.</p>
                                </div>
                            </div>
                        </Link>
                        <p className="text-text-secondary leading-relaxed max-w-sm font-medium">
                            The ultimate encyclopedia for coding errors. We help developers fix bugs faster with precise solutions, detailed explanations, and copy-paste ready code.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <SocialLink href="https://github.com" icon={Github} label="GitHub" />
                            <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
                            <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
                        </div>
                    </div>

                    {/* Quick Link Columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-black text-sm uppercase tracking-widest text-text-primary flex items-center gap-2">
                            <Command size={14} className="text-accent-purple" />
                            Platform
                        </h4>
                        <ul className="space-y-4 text-sm font-medium text-text-secondary">
                            <FooterLink href="/errors">Error Database</FooterLink>
                            <FooterLink href="/languages">Languages</FooterLink>
                            <FooterLink href="/editor">Online Editor</FooterLink>
                            <FooterLink href="/extension">VS Code Extension</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-black text-sm uppercase tracking-widest text-text-primary flex items-center gap-2">
                            <Cpu size={14} className="text-accent-green" />
                            Community
                        </h4>
                        <ul className="space-y-4 text-sm font-medium text-text-secondary">
                            <FooterLink href="/contribute">Contribute Fixes</FooterLink>
                            <FooterLink href="/leaderboard">Leaderboard</FooterLink>
                            <FooterLink href="/discussions">Discussions</FooterLink>
                            <FooterLink href="/api">API Access</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="font-black text-sm uppercase tracking-widest text-text-primary flex items-center gap-2">
                            <Mail size={14} className="text-accent-yellow" />
                            Stay Updated
                        </h4>
                        <p className="text-xs text-text-secondary font-medium">
                            Get the latest bug fixes, interviews, and dev tips delivered to your inbox weekly.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="dev@example.com"
                                className="w-full bg-background border-2 border-border text-sm font-bold py-3 pl-4 pr-12 rounded-xl focus:outline-none focus:border-accent-blue transition-all placeholder:font-medium placeholder:text-text-secondary/50"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent-blue text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent-blue/20">
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-bold text-text-secondary text-center md:text-left">
                        &copy; {new Date().getFullYear()} DevFixer Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-bold text-text-secondary">
                        <Link href="/privacy" className="hover:text-accent-blue transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-accent-blue transition-colors">Terms of Service</Link>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest border border-border px-3 py-1.5 rounded-lg bg-background/50">
                        <span>Made with</span>
                        <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
                        <span>by Developers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Components
const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-background border-2 border-border text-text-secondary hover:text-white hover:bg-black hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300 group"
        aria-label={label}
    >
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
    </a>
);

const FooterLink = ({ href, children }) => (
    <li>
        <Link href={href} className="hover:text-accent-blue hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue scale-0 group-hover:scale-100 transition-transform" />
            {children}
        </Link>
    </li>
);

export default Footer;
