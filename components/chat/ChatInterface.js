
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';

export default function ChatInterface({ onSubmit, isLoading, placeholder = "Paste your error message here..." }) {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSubmit(input);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="relative flex items-end gap-2 p-4 bg-surface rounded-xl border border-border shadow-lg focus-within:ring-2 focus-within:ring-accent-primary/50 transition-all">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full bg-transparent border-0 focus:ring-0 resize-none min-h-[60px] max-h-[200px] py-2 text-text-primary placeholder:text-text-secondary/50"
                        rows={1}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`p-3 rounded-lg transition-all duration-200 ${input.trim() && !isLoading
                                ? 'bg-accent-primary text-white hover:bg-accent-primary/90 shadow-md'
                                : 'bg-surface-hover text-text-secondary cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <div className="mt-2 text-xs text-center text-text-secondary flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>AI can make mistakes. Always verify the solution.</span>
                </div>
            </form>
        </div>
    );
}
