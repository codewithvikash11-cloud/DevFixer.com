"use client";

import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/compiler/CodeEditor';
import OutputPanel from '@/components/compiler/OutputPanel';
import RovioTechFooter from '@/components/compiler/RovioTechFooter';
import { useNavbar } from '@/context/NavbarContext';
import { LANGUAGE_TEMPLATES } from '@/lib/templates';
import { executeCode } from '@/lib/piston';
import { FileCode, FileType, MoreHorizontal, Save, Share2, LayoutTemplate, Play, Square, ChevronDown, Terminal } from 'lucide-react'; // Trigger HMR

const FILES = {
    HTML: { name: 'index.html', language: 'html', content: LANGUAGE_TEMPLATES.html, icon: FileType, color: 'text-orange-500' },
    CSS: { name: 'styles.css', language: 'css', content: LANGUAGE_TEMPLATES.css, icon: FileType, color: 'text-blue-500' },
    JS: { name: 'script.js', language: 'javascript', content: LANGUAGE_TEMPLATES.javascript, icon: FileCode, color: 'text-yellow-400' }
};

const BACKEND_LANGUAGES = {
    python: { name: 'Python', icon: FileCode, template: 'print("Hello ErrorWiki!")' },
    javascript: { name: 'Node.js', icon: FileCode, template: 'console.log("Hello ErrorWiki!");' },
    cpp: { name: 'C++', icon: FileType, template: '#include <iostream>\n\nint main() {\n    std::cout << "Hello ErrorWiki!" << std::endl;\n    return 0;\n}' },
    java: { name: 'Java', icon: FileType, template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello ErrorWiki!");\n    }\n}' },
    go: { name: 'Go', icon: FileCode, template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello ErrorWiki!")\n}' },
    sqlite3: { name: 'SQL', icon: FileType, template: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO users (name) VALUES ("Alice"), ("Bob");\nSELECT * FROM users;' },
};

export default function CompilerPage() {
    // MODES
    const [compilerMode, setCompilerMode] = useState('web'); // 'web' | 'backend'
    const [backendLanguage, setBackendLanguage] = useState('python');

    // WEB STATE
    const [activeTab, setActiveTab] = useState('HTML');
    const [activeTheme, setActiveTheme] = useState('vs-dark'); // Theme State
    const [fileContent, setFileContent] = useState({
        HTML: LANGUAGE_TEMPLATES.html,
        CSS: LANGUAGE_TEMPLATES.css,
        JS: LANGUAGE_TEMPLATES.javascript
    });

    // SHARE HANDLER
    const handleShare = async () => {
        const textToShare = compilerMode === 'web'
            ? `HTML:\n${fileContent.HTML}\n\nCSS:\n${fileContent.CSS}\n\nJS:\n${fileContent.JS}`
            : backendCode;

        try {
            await navigator.clipboard.writeText(textToShare);
            alert("Code copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    // BACKEND STATE
    const [backendCode, setBackendCode] = useState(BACKEND_LANGUAGES.python.template);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState([]); // Array of log lines

    const activeFile = FILES[activeTab];

    // Effect to update code when language changes
    useEffect(() => {
        if (compilerMode === 'backend') {
            setBackendCode(BACKEND_LANGUAGES[backendLanguage].template);
            setOutput([]);
        }
    }, [backendLanguage, compilerMode]);

    const handleCodeChange = (newContent) => {
        if (compilerMode === 'web') {
            setFileContent(prev => ({ ...prev, [activeTab]: newContent }));
        } else {
            setBackendCode(newContent);
        }
    };

    const getSrcDoc = () => {
        const html = fileContent.HTML;
        const css = fileContent.CSS;
        const js = fileContent.JS;
        return html.replace('</head>', `<style>${css}</style></head>`).replace('</body>', `<script>${js}</script></body>`);
    };

    const runBackendCode = async () => {
        setIsRunning(true);
        setOutput([{ type: 'info', content: 'Running...' }]);

        try {
            const result = await executeCode(backendLanguage, backendCode);
            if (result.run) {
                const logs = [];
                if (result.run.stdout) logs.push({ type: 'log', content: result.run.stdout });
                if (result.run.stderr) logs.push({ type: 'error', content: result.run.stderr });
                if (result.run.output && !result.run.stdout && !result.run.stderr) logs.push({ type: 'log', content: result.run.output });

                if (logs.length === 0) logs.push({ type: 'info', content: 'Process finished with exit code ' + result.run.code });

                setOutput(logs);
            } else {
                setOutput([{ type: 'error', content: 'Execution failed: No response from server' }]);
            }
        } catch (error) {
            setOutput([{ type: 'error', content: 'Error: ' + error.message }]);
        } finally {
            setIsRunning(false);
        }
    };

    // NAVBAR CONTENT
    // TOOLBAR COMPONENTS
    const ModeSwitcher = (
        <div className="flex bg-[#1e293b] p-0.5 rounded-lg border border-[#334155] mr-4">
            <button
                onClick={() => setCompilerMode('web')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${compilerMode === 'web' ? 'bg-accent-primary text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
                Web
            </button>
            <button
                onClick={() => setCompilerMode('backend')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${compilerMode === 'backend' ? 'bg-accent-primary text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
                Backend
            </button>
        </div>
    );

    const ThemeSelector = (
        <div className="flex items-center gap-2">
            <LayoutTemplate size={14} className="text-gray-400" />
            <select
                value={activeTheme}
                onChange={(e) => setActiveTheme(e.target.value)}
                className="bg-transparent text-xs text-gray-400 font-medium py-1 outline-none cursor-pointer hover:text-white transition-colors"
            >
                <option value="vs-dark">VS Dark</option>
                <option value="dracula">Dracula</option>
                <option value="monokai">Monokai</option>
                <option value="github-dark">GitHub Dark</option>
            </select>
        </div>
    );

    // NAVBAR SYNC
    const { setCenterContent, setCustomActions, setHideSearch, setHideLinks } = useNavbar();

    // Sync Navbar Content
    useEffect(() => {
        setCenterContent(null);
        setCustomActions(null);
        setHideSearch(false);
        setHideLinks(false);

        return () => {
            setHideSearch(false);
            setHideLinks(false);
        };

    }, []);

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] bg-[#000000] text-white font-sans overflow-y-auto md:overflow-hidden">

            {/* 2. Main Workspace */}
            <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">

                {/* LEFT: Code Editor */}
                <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-[#1e293b] min-h-[500px] md:min-h-0">

                    {/* LEFT PANEL HEADER */}
                    <div className="h-12 bg-[#0f172a] border-b border-[#334155] flex items-center justify-between px-4 overflow-x-auto no-scrollbar">
                        <div className="flex items-center">
                            {ModeSwitcher}

                            {/* Tabs / Lang Selector */}
                            {compilerMode === 'web' ? (
                                <div className="flex items-center gap-1">
                                    {Object.keys(FILES).map((tab) => {
                                        const isActive = activeTab === tab;
                                        return (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`
                                                    relative px-3 py-1.5 text-xs font-bold transition-colors rounded-t-lg
                                                    ${isActive ? "text-accent-primary bg-[#1e293b] border-t border-x border-[#334155]" : "text-gray-400 hover:text-white hover:bg-[#1e293b]/50"}
                                                `}
                                                style={{ marginBottom: isActive ? '-1px' : '0' }}
                                            >
                                                {tab}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="relative group flex items-center gap-2">
                                    <FileCode size={14} className="text-accent-primary" />
                                    <select
                                        value={backendLanguage}
                                        onChange={(e) => setBackendLanguage(e.target.value)}
                                        className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer appearance-none pr-4"
                                    >
                                        {Object.entries(BACKEND_LANGUAGES).map(([key, lang]) => (
                                            <option key={key} value={key}>{lang.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={10} className="text-gray-400 pointer-events-none -ml-4" />
                                </div>
                            )}
                        </div>

                        {/* Right side of Left Header */}
                        <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-[#334155] ml-4">
                            {ThemeSelector}
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 relative bg-[#000000]">
                        <CodeEditor
                            language={compilerMode === 'web' ? activeFile.language : backendLanguage === 'cpp' ? 'cpp' : backendLanguage === 'javascript' ? 'javascript' : backendLanguage === 'java' ? 'java' : backendLanguage === 'go' ? 'go' : backendLanguage === 'sqlite3' ? 'sql' : 'python'}
                            value={compilerMode === 'web' ? fileContent[activeTab] : backendCode}
                            onChange={handleCodeChange}
                            theme={activeTheme}
                        />
                    </div>
                </div>

                {/* RIGHT: Output / Preview */}
                <div className="flex-1 flex flex-col bg-[#000000] min-h-[50vh] md:min-h-0">
                    {compilerMode === 'web' ? (
                        <div className="flex-1 flex flex-col bg-white">
                            {/* Preview Header */}
                            <div className="h-12 bg-white border-b flex items-center justify-between px-4">
                                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase flex items-center gap-2">
                                    <LayoutTemplate size={14} />
                                    Live Preview
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-all">
                                        <Share2 size={12} />
                                        Share
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 relative">
                                <iframe
                                    srcDoc={getSrcDoc()}
                                    title="Live Preview"
                                    sandbox="allow-scripts"
                                    className="w-full h-full border-none"
                                />
                            </div>
                        </div>
                    ) : (
                        // BACKEND CONSOLE
                        <div className="flex-1 flex flex-col bg-[#0f172a]">
                            <div className="h-12 bg-[#1e293b] border-b border-[#334155] flex items-center justify-between px-4">
                                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-2">
                                    <Terminal size={14} />
                                    Console Output
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={runBackendCode}
                                        disabled={isRunning}
                                        className="flex items-center gap-2 px-4 py-1.5 bg-accent-primary hover:bg-accent-hover text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,128,0,0.4)]"
                                    >
                                        {isRunning ? <Square size={12} className="animate-pulse" /> : <Play size={12} />}
                                        <span>{isRunning ? 'Running...' : 'Run'}</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                                {output.length === 0 ? (
                                    <div className="text-gray-500 italic">Click Run to execute code...</div>
                                ) : (
                                    output.map((log, i) => (
                                        <div key={i} className={`mb-1 ${log.type === 'error' ? 'text-red-400' : 'text-gray-200'}`}>
                                            <span className="opacity-50 select-none mr-2">$</span>
                                            {log.content}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Footer */}
            <RovioTechFooter />
        </div>
    );
}
