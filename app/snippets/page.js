"use client";

import React, { useState } from 'react';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    Search,
    Copy,
    Check,
    Tag,
    Code2,
    Database,
    Layout,
    Box
} from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';

// MOCK DATA
const SNIPPETS = [
    {
        id: '1',
        title: 'React UseDebounce Hook',
        category: 'React',
        description: 'Delay execution of a function until after a wait period.',
        code: `import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
    },
    {
        id: '2',
        title: 'Center Div with Flexbox',
        category: 'CSS',
        description: 'The classic way to center an element horizontally and vertically.',
        code: `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}`
    },
    {
        id: '3',
        title: 'Node.js Express Basic Server',
        category: 'Node.js',
        description: 'Bootstrap a simple Express server.',
        code: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`);
});`
    },
    {
        id: '4',
        title: 'JavaScript Deep Clone',
        category: 'JavaScript',
        description: 'Deep clone an object using structuredClone API.',
        code: `const original = { name: "John", details: { age: 30 } };
const clone = structuredClone(original);

console.log(clone.details === original.details); // false`
    },
    {
        id: '5',
        title: 'React Custom Button Component',
        category: 'React',
        description: 'A button component with variant props.',
        code: `const Button = ({ children, variant = "primary", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md font-bold transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  return (
    <button className={\`\${baseStyle} \${variants[variant]}\`} {...props}>
      {children}
    </button>
  );
};`
    }
];

const CATEGORIES = [
    { name: 'All', icon: Layout },
    { name: 'React', icon: Box },
    { name: 'JavaScript', icon: Code2 },
    { name: 'CSS', icon: Layout },
    { name: 'Node.js', icon: Database }
];

export default function SnippetsPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredSnippets = SNIPPETS.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
            s.description.toLowerCase().includes(search.toLowerCase());
        const matchesCat = activeCategory === 'All' || s.category === activeCategory;
        return matchesSearch && matchesCat;
    });

    return (
        <LayoutWrapper>
            <div className="min-h-screen bg-background pb-20">
                {/* Header */}
                <div className="pt-20 pb-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Snippet Library</h1>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        Copy-paste ready solutions for your everyday coding tasks.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <div className="container mx-auto px-4 mb-12">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                            <input
                                type="text"
                                placeholder="Search snippets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-panel border border-border rounded-xl py-3 pl-12 pr-4 text-sm focus:border-accent-blue focus:outline-none transition-all shadow-lg"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat.name
                                            ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20 transform scale-105'
                                            : 'bg-panel border border-border text-text-secondary hover:bg-white/5'
                                        }`}
                                >
                                    <cat.icon size={14} />
                                    <span>{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Snippets Grid */}
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 gap-8">
                        {filteredSnippets.map((snippet) => (
                            <div key={snippet.id} className="spotlight-card rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="px-3 py-1 rounded-lg bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-widest border border-accent-blue/20">
                                                {snippet.category}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-text-primary">{snippet.title}</h2>
                                        <p className="text-text-secondary mt-1 text-sm">{snippet.description}</p>
                                    </div>
                                </div>

                                <CodeBlock
                                    code={snippet.code}
                                    language={snippet.category.toLowerCase().replace('.', '')}
                                    fileName={`${snippet.title.replace(/\s+/g, '-')}.${snippet.category === 'CSS' ? 'css' : 'js'}`}
                                />
                            </div>
                        ))}

                        {filteredSnippets.length === 0 && (
                            <div className="text-center py-20 opacity-50">
                                <Code2 size={48} className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold">No snippets found</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
