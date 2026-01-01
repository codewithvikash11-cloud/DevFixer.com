"use client";

import React, { useRef, useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Pre-load themes or configure loader
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' } });

export default function CodeEditor({ language, value, onChange, theme = 'vs-dark' }) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Custom Theme Definition (One Hunter Theme - Example)
        monaco.editor.defineTheme('one-hunter', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'c678dd' },
                { token: 'string', foreground: '98c379' }
            ],
            colors: {
                'editor.background': '#0f0f12', // Matches app bg
                'editor.lineHighlightBackground': '#1e1e24',
                'editorLineNumber.foreground': '#4b5263'
            }
        });

        // If 'dracula' or others needed, define here
    };

    return (
        <div className="h-full w-full relative group">
            <Editor
                height="100%"
                language={language === 'javascript' || language === 'node' ? 'javascript' : language}
                value={value}
                theme={theme === 'vs-dark' ? 'vs-dark' : 'one-hunter'} // Use VS Dark default or Custom
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    padding: { top: 16 },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on"
                }}
            />

            {/* Smooth Shadow Overlay for aesthetics */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" />
        </div>
    );
}
