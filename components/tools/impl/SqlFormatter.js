"use client";

import React, { useState } from 'react';
import { Copy, Database, Check } from 'lucide-react';

export default function SqlFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // Basic SQL formatting logic (Regex based)
    const formatSql = (sql) => {
        let text = sql
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*([,()])\s*/g, '$1 ') // Spacing around comma/parentheses
            .replace(/\s*;\s*/g, ';\n'); // Newline after semicolon

        const keywords = [
            "SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN",
            "INNER JOIN", "OUTER JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
            "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE",
            "ALTER TABLE", "DROP TABLE"
        ];

        // Uppercase keywords and add newlines
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'gi');
            text = text.replace(regex, `\n${kw}`);
        });

        return text.trim();
    };

    const handleFormat = () => {
        if (!input.trim()) return;
        const res = formatSql(input);
        setOutput(res);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Database className="text-accent-primary" />
                    SQL Formatter
                </h3>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px]">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary">Input SQL</label>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface border border-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none font-mono text-sm resize-none"
                        placeholder="SELECT * FROM users WHERE id = 1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-text-secondary">Formatted Output</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-accent-primary hover:text-accent-hover transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl bg-surface-highlight border border-border outline-none font-mono text-sm resize-none text-text-primary"
                        readOnly
                        value={output}
                        placeholder="Formatted SQL will appear here..."
                    />
                </div>
            </div>

            <button
                onClick={handleFormat}
                className="w-full py-3 bg-accent-primary text-white font-bold rounded-xl hover:bg-accent-primary/90 transition-all shadow-lg shadow-accent-primary/20"
            >
                Format SQL
            </button>
        </div>
    );
}
