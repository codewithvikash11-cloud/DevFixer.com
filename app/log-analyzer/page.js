"use client";

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import { ScrollText, Sparkles, AlertTriangle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function LogAnalyzerPage() {
    const [logs, setLogs] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeLogs = () => {
        if (!logs.trim()) return;
        setIsAnalyzing(true);
        setResult(null);

        // Simulated AI Logic
        setTimeout(() => {
            let analysis = {
                type: 'Unknown',
                severity: 'Low',
                error: 'No critical errors detected.',
                rootCause: 'The logs seem cleaner than usual, or the error format is not recognized.',
                fix: 'Double check if you pasted the full stack trace.',
                bestPractices: ['Enable verbose logging', 'Check network tab for 500 errors']
            };

            if (logs.includes('NullPointerException') || logs.includes('java.lang')) {
                analysis = {
                    type: 'Java Runtime Exception',
                    severity: 'Critical',
                    error: 'NullPointerException',
                    rootCause: 'Attempting to access a property or method on a null object reference.',
                    fix: 'Check the line numbers in the stack trace. Ensure objects are initialized before use. Use Optional<T> or adds null checks.',
                    bestPractices: ['Use Objects.requireNonNull()', 'Adopt a "fail-fast" strategy']
                };
            } else if (logs.includes('TypeError') || logs.includes('undefined is not a function')) {
                analysis = {
                    type: 'JavaScript Error',
                    severity: 'High',
                    error: 'TypeError: undefined is not a function',
                    rootCause: 'You are trying to call a method that does not exist, likely due to a typo or missing import.',
                    fix: 'Verify the function name spelling. Check if the library is correctly imported. Console.log the object before the call.',
                    bestPractices: ['Use TypeScript for type safety', 'Implement optional chaining (?.)']
                };
            } else if (logs.includes('ModuleNotFoundError') || logs.includes('ImportError')) {
                analysis = {
                    type: 'Python Import Error',
                    severity: 'Medium',
                    error: 'Module Not Found',
                    rootCause: 'The specified python module is not installed in the current environment.',
                    fix: 'Run `pip install <module_name>`. Check your virtual environment activation.',
                    bestPractices: ['Use requirements.txt', 'Check sys.path']
                };
            }

            setResult(analysis);
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <LayoutWrapper>
            <div className="min-h-screen bg-background pb-20">
                <div className="container mx-auto px-4 max-w-5xl">

                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold mb-6">
                            <Sparkles size={12} />
                            <span>AI Powered Debugging</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4 tracking-tight">
                            Smart <span className="text-[#008000]">Log Analyzer</span>
                        </h1>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                            Paste your error stack traces below. Our AI measures the severity, detects the root cause, and suggests a fix instantly.
                        </p>
                    </div>

                    {/* Input Section */}
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-accent-hover rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative">
                                    <textarea
                                        value={logs}
                                        onChange={(e) => setLogs(e.target.value)}
                                        placeholder="Paste stack trace or error logs here..."
                                        className="w-full h-64 md:h-96 bg-surface border border-border rounded-xl p-6 font-mono text-sm text-text-primary outline-none focus:border-accent-primary/50 resize-none transition-all placeholder:text-text-tertiary"
                                    ></textarea>
                                    <button
                                        onClick={analyzeLogs}
                                        disabled={isAnalyzing || !logs.trim()}
                                        className="absolute bottom-4 right-4 bg-accent-primary hover:bg-accent-hover text-white font-bold py-2 px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-primary/20"
                                    >
                                        {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <ScrollText size={18} />}
                                        {isAnalyzing ? 'Scanning...' : 'Analyze Logs'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4 text-xs text-text-tertiary font-mono pl-2">
                                <span>Supported: Java</span>
                                <span>•</span>
                                <span>Node.js</span>
                                <span>•</span>
                                <span>Python</span>
                                <span>•</span>
                                <span>React</span>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div className="relative min-h-[400px]">
                            {!result && !isAnalyzing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-text-tertiary border-2 border-dashed border-border rounded-2xl bg-surface/50">
                                    <ScrollText size={48} className="mb-4 opacity-20" />
                                    <p className="text-sm">Waiting for logs...</p>
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface border border-border rounded-2xl z-10">
                                    <div className="relative w-24 h-24 mb-6">
                                        <div className="absolute inset-0 border-4 border-accent-primary/20 rounded-full animate-ping"></div>
                                        <div className="absolute inset-0 border-4 border-t-accent-primary rounded-full animate-spin"></div>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary mb-2">Analyzing Patterns...</h3>
                                    <p className="text-sm text-text-secondary animate-pulse">Checking StackOverflow database...</p>
                                </div>
                            )}

                            {result && (
                                <div className="bg-surface border border-border rounded-2xl overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500">
                                    {/* Result Header */}
                                    <div className="bg-panel p-6 border-b border-border">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Detected Issue</span>
                                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${result.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                                result.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                                    'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                {result.severity} Severity
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                            <AlertTriangle size={20} className="text-accent-primary" />
                                            {result.error}
                                        </h2>
                                    </div>

                                    {/* Analysis Body */}
                                    <div className="p-6 space-y-6">
                                        <div>
                                            <h4 className="text-sm font-bold text-text-secondary mb-2 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary"></div> Root Cause
                                            </h4>
                                            <p className="text-text-primary text-sm leading-relaxed bg-panel p-3 rounded-lg border border-border">
                                                {result.rootCause}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-text-secondary mb-2 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent-success"></div> Recommended Fix
                                            </h4>
                                            <div className="bg-accent-success/10 border border-accent-success/20 rounded-xl p-4">
                                                <p className="text-accent-success text-sm font-medium">
                                                    {result.fix}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-bold text-text-secondary mb-2">Best Practices</h4>
                                            <ul className="space-y-2">
                                                {result.bestPractices.map((bp, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                                                        <CheckCircle size={14} className="text-accent-info" />
                                                        {bp}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
