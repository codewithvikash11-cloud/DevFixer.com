"use client";

import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/compiler/CodeEditor';
import OutputPanel from '@/components/compiler/OutputPanel';
import CodeOrbitFooter from '@/components/compiler/CodeOrbitFooter';
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
    python: { name: 'Python', icon: FileCode, template: 'print("Hello CodeOrbit!")' },
    javascript: { name: 'Node.js', icon: FileCode, template: 'console.log("Hello CodeOrbit!");' },
    cpp: { name: 'C++', icon: FileType, template: '#include <iostream>\n\nint main() {\n    std::cout << "Hello CodeOrbit!" << std::endl;\n    return 0;\n}' },
    java: { name: 'Java', icon: FileType, template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello CodeOrbit!");\n    }\n}' },
    go: { name: 'Go', icon: FileCode, template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello CodeOrbit!")\n}' },
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
    const CompilerTabs = (
        <div className="flex items-center gap-4">
            {/* Mode Switcher */}
            <div className="flex bg-[#1e293b] p-1 rounded-lg">
                <button
                    onClick={() => setCompilerMode('web')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${compilerMode === 'web' ? 'bg-[#008000] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    Web
                </button>
                <button
                    onClick={() => setCompilerMode('backend')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${compilerMode === 'backend' ? 'bg-[#008000] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                >
                    Backend
                </button>
            </div>

            {compilerMode === 'web' ? (
                // WEB TABS
                <div className="flex items-center gap-1">
                    {Object.keys(FILES).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md
                                    ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                                `}
                            >
                                {tab}
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-1/2 bg-[#008000] rounded-full shadow-[0_0_8px_#008000]"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            ) : (
                // BACKEND LANGUAGE SELECTOR
                <div className="relative group">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-[#1e293b] border border-[#334155] rounded-lg hover:border-[#008000]/50 transition-colors">
                        {BACKEND_LANGUAGES[backendLanguage].name}
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    {/* Dropdown would go here - simplified for now with native select */}
                    <select
                        value={backendLanguage}
                        onChange={(e) => setBackendLanguage(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                        {Object.entries(BACKEND_LANGUAGES).map(([key, lang]) => (
                            <option key={key} value={key}>{lang.name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );

    const CompilerActions = (
        <div className="flex items-center gap-3">
            {/* Theme Selector */}
            <div className="hidden md:flex items-center bg-[#1e293b] rounded-lg border border-[#334155] px-2">
                <LayoutTemplate size={14} className="text-gray-400 mr-2" />
                <select
                    value={activeTheme}
                    onChange={(e) => setActiveTheme(e.target.value)}
                    className="bg-transparent text-xs text-white font-medium py-1.5 outline-none cursor-pointer"
                >
                    <option value="vs-dark">VS Dark</option>
                    <option value="dracula">Dracula</option>
                    <option value="monokai">Monokai</option>
                    <option value="github-dark">GitHub Dark</option>
                </select>
            </div>

            {compilerMode === 'backend' && (
                <button
                    onClick={runBackendCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-1.5 bg-[#008000] hover:bg-[#006600] text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,128,0,0.4)]"
                >
                    {isRunning ? <Square size={14} className="animate-pulse" /> : <Play size={14} />}
                    <span>{isRunning ? 'Running...' : 'Run'}</span>
                </button>
            )}

            <button onClick={handleShare} className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] hover:bg-[#2e3e52] text-white text-xs font-bold rounded-lg border border-[#334155] transition-all">
                <Share2 size={14} />
                <span>Share</span>
            </button>
        </div>
    );

    // NAVBAR SYNC
    const { setCenterContent, setCustomActions, setHideSearch } = useNavbar();

    // Sync Navbar Content
    useEffect(() => {
        setCenterContent(CompilerTabs);
        setCustomActions(CompilerActions);
        setHideSearch(true);

        return () => {
            setCenterContent(null);
            setCustomActions(null);
            setHideSearch(false);
        };
    }, [compilerMode, activeTab, backendLanguage, activeTheme, isRunning]);

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-[#000000] text-white font-sans overflow-hidden">

            {/* 2. Main Workspace */}
            <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden">

                {/* LEFT: Code Editor */}
                <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-[#1e293b] min-h-[50vh] md:min-h-0">
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
                            <div className="h-11 bg-white border-b flex items-center justify-between px-4">
                                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Live Preview</span>
                                <div className="flex gap-2">
                                    <Share2 size={16} className="text-gray-400 cursor-pointer hover:text-black" onClick={handleShare} />
                                    <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
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
                            <div className="h-11 bg-[#1e293b] border-b border-[#334155] flex items-center justify-between px-4">
                                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-2">
                                    <Terminal size={14} />
                                    Console Output
                                </span>
                                <div className="text-[10px] text-gray-500">Piston Exec Environment</div>
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
            <CodeOrbitFooter />
        </div>
    );
}
