"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CURRICULUM } from '@/lib/data/learn-curriculum';
import {
    BookOpen,
    ChevronRight,
    ChevronLeft,
    Play,
    RotateCcw,
    CheckCircle2,
    Menu,
    X,
    Search,
    Save,
    Star,
    TerminalSquare,
    Maximize2,
    Download,
    Minus,
    Plus,
    Layout
} from 'lucide-react';
import CodeEditor from '@/components/compiler/CodeEditor'; // Ensure this path is correct
import { cn } from '@/lib/utils';
import Link from 'next/link';

const VIEW_MODES = {
    LESSON: 'lesson',
    EDITOR: 'editor'
};

export default function LearnPage() {
    // STATE: Navigation
    const [activeCourseId, setActiveCourseId] = useState('html');
    const [activeLessonId, setActiveLessonId] = useState('html-intro');

    // STATE: UI
    const [showSidebar, setShowSidebar] = useState(true);
    const [mobileView, setMobileView] = useState(VIEW_MODES.LESSON);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConsole, setShowConsole] = useState(false);
    const [fontSize, setFontSize] = useState(14); // Editor font size

    // STATE: Editor
    const [code, setCode] = useState({ html: '', css: '', js: '' });
    const [activeTab, setActiveTab] = useState('HTML');
    const [srcDoc, setSrcDoc] = useState('');
    const [logs, setLogs] = useState([]); // Console logs

    // STATE: Persistence
    const [completedLessons, setCompletedLessons] = useState([]);
    const [bookmarkedLessons, setBookmarkedLessons] = useState([]);
    const [expandedSections, setExpandedSections] = useState({}); // Track expanded sections

    // --- DERIVED DATA ---
    const activeCourse = useMemo(() => CURRICULUM.find(c => c.id === activeCourseId) || CURRICULUM[0], [activeCourseId]);

    // Flatten lessons for easy navigation
    const allLessons = useMemo(() => {
        return activeCourse.sections.flatMap(section => section.lessons);
    }, [activeCourse]);

    const activeLesson = useMemo(() => allLessons.find(l => l.id === activeLessonId) || allLessons[0], [allLessons, activeLessonId]);

    const activeSection = useMemo(() => {
        return activeCourse.sections.find(s => s.lessons.some(l => l.id === activeLessonId));
    }, [activeCourse, activeLessonId]);


    // SEARCH FILTER
    const filteredCurriculum = useMemo(() => {
        if (!searchQuery) return [activeCourse]; // Show only active course if no search
        // Simple search across all courses
        return CURRICULUM.map(course => ({
            ...course,
            sections: course.sections.map(sec => ({
                ...sec,
                lessons: sec.lessons.filter(l =>
                    l.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            })).filter(sec => sec.lessons.length > 0)
        })).filter(c => c.sections.length > 0);
    }, [searchQuery, activeCourse]);


    // --- EFFECTS ---

    // 1. Persistence
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('roviotech_learn_progress');
            if (savedProgress) setCompletedLessons(JSON.parse(savedProgress));

            const savedBookmarks = localStorage.getItem('roviotech_learn_bookmarks');
            if (savedBookmarks) setBookmarkedLessons(JSON.parse(savedBookmarks));
        } catch (e) { console.error(e); }
    }, []);

    // 2. Load Content
    useEffect(() => {
        if (activeLesson?.code) {
            // Reset code only if it's different to prevent overwrite on type
            // Actually, for a lesson change, we want to reset.
            // For now, simple set.
            setCode(activeLesson.code);
            setLogs([]);
            // Auto-expand the section containing this lesson
            const section = activeCourse.sections.find(s => s.lessons.some(l => l.id === activeLessonId));
            if (section) {
                setExpandedSections(prev => ({ ...prev, [section.title]: true }));
            }
        }
    }, [activeLessonId, activeCourse]);

    // 3. Iframe Console
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'console') {
                setLogs(prev => [...prev, { method: event.data.method, args: event.data.args }]);
                setShowConsole(true);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Mobile Sidebar Init
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setShowSidebar(false);
        }
    }, []);

    // --- HANDLERS ---

    const runCode = (codeToRun = code) => {
        setLogs([]);
        const htmlContent = codeToRun.html || '';
        const cssContent = codeToRun.css || '';
        const jsContent = codeToRun.js || '';
        const scriptInterceptor = `<script>
            const originalLog = console.log;
            function sendToParent(method, args) { try { parent.postMessage({ type: 'console', method: method, args: args.map(String) }, '*'); } catch(e) {} }
            console.log = function(...args) { sendToParent('log', args); originalLog.apply(console, args); };
            console.error = function(...args) { sendToParent('error', args); console.error.apply(console, args); };
            window.onerror = function(msg) { sendToParent('error', [msg]); };
        </script>`;
        const result = `<!DOCTYPE html><html><head><style>${cssContent}</style></head><body>${htmlContent}${scriptInterceptor}<script>${jsContent}</script></body></html>`;
        setSrcDoc(result);
    };

    useEffect(() => {
        const timeout = setTimeout(() => runCode(code), 800);
        return () => clearTimeout(timeout);
    }, [code]);

    const toggleCompletion = (id) => {
        let newCompleted = completedLessons.includes(id)
            ? completedLessons.filter(c => c !== id)
            : [...completedLessons, id];
        setCompletedLessons(newCompleted);
        localStorage.setItem('roviotech_learn_progress', JSON.stringify(newCompleted));
    };

    const toggleBookmark = () => {
        let newBookmarks = bookmarkedLessons.includes(activeLessonId)
            ? bookmarkedLessons.filter(b => b !== activeLessonId)
            : [...bookmarkedLessons, activeLessonId];
        setBookmarkedLessons(newBookmarks);
        localStorage.setItem('roviotech_learn_bookmarks', JSON.stringify(newBookmarks));
    };

    const navigateLesson = (direction) => {
        const idx = allLessons.findIndex(l => l.id === activeLessonId);
        const nextIdx = direction === 'next' ? idx + 1 : idx - 1;
        if (nextIdx >= 0 && nextIdx < allLessons.length) {
            setActiveLessonId(allLessons[nextIdx].id);
            document.getElementById('lesson-content')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // --- RENDER HELPERS ---
    const isBookmarked = bookmarkedLessons.includes(activeLessonId);
    const progress = Math.round((completedLessons.filter(id => allLessons.map(l => l.id).includes(id)).length / allLessons.length) * 100) || 0;

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background text-text-primary overflow-hidden font-sans">

            {/* HEADER */}
            <header className="h-14 border-b border-border bg-panel flex items-center justify-between px-4 shrink-0 z-20 shadow-sm relative">
                <div className="flex items-center gap-4 overflow-hidden">
                    <button onClick={() => setShowSidebar(!showSidebar)} className="text-text-secondary hover:text-text-primary p-1 rounded-md hover:bg-surface/50 transition-colors">
                        <Menu size={20} />
                    </button>
                    {/* BREADCRUMBS */}
                    <div className="flex items-center gap-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className={cn("font-bold px-2 py-0.5 rounded text-white text-xs", activeCourse.color.replace('text-', 'bg-'))}>
                            {activeCourse.title}
                        </span>
                        <ChevronRight size={14} className="text-text-tertiary" />
                        <span className="text-text-secondary hidden sm:inline">{activeSection?.title}</span>
                        <ChevronRight size={14} className="text-text-tertiary hidden sm:inline" />
                        <span className="font-bold text-text-primary truncate">{activeLesson.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Progress Bar (Desktop) */}
                    <div className="hidden md:flex flex-col items-end w-32">
                        <div className="flex justify-between w-full text-[10px] uppercase font-bold text-text-tertiary mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                            <div className="h-full bg-accent-success transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    <div className="h-6 w-px bg-border/50 hidden md:block" />

                    {/* Bookmark */}
                    <button onClick={toggleBookmark} className={cn("p-2 rounded-lg transition-colors", isBookmarked ? "text-yellow-400 bg-yellow-400/10" : "text-text-tertiary hover:bg-surface")}>
                        <Star size={18} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden bg-surface p-1 rounded-lg ml-2">
                        <button onClick={() => setMobileView(VIEW_MODES.LESSON)} className={cn("px-3 py-1 text-xs font-bold rounded transition-all", mobileView === VIEW_MODES.LESSON ? "bg-white text-black shadow-sm" : "text-text-secondary")}>
                            Learn
                        </button>
                        <button onClick={() => setMobileView(VIEW_MODES.EDITOR)} className={cn("px-3 py-1 text-xs font-bold rounded transition-all", mobileView === VIEW_MODES.EDITOR ? "bg-white text-black shadow-sm" : "text-text-secondary")}>
                            Code
                        </button>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* 1. SIDEBAR (Curriculum Tree) */}
                <aside className={cn(
                    "w-72 bg-panel border-r border-border flex flex-col z-30 transition-all duration-300 absolute h-full lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none",
                    showSidebar ? "translate-x-0" : "-translate-x-full lg:w-0 lg:overflow-hidden lg:border-none"
                )}>
                    {/* Search */}
                    <div className="p-3 border-b border-border bg-panel sticky top-0 z-10">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-surface border border-border rounded-md pl-9 pr-3 py-1.5 text-xs font-medium focus:ring-1 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all placeholder:text-text-tertiary"
                            />
                        </div>
                    </div>

                    {/* Tree */}
                    <div className="flex-1 overflow-y-auto p-2">
                        {searchQuery && (
                            <div className="px-2 py-1 text-xs font-bold text-text-tertiary uppercase mb-2">Search Results</div>
                        )}

                        {/* Always show course selector if searching, or just current course structure */}
                        {filteredCurriculum.map((course) => (
                            <div key={course.id} className="mb-6">
                                {/* Course Title if searching or multiple shown */}
                                {(searchQuery || course.id !== activeCourseId) && (
                                    <button onClick={() => { setActiveCourseId(course.id); setSearchQuery(''); }} className="flex items-center gap-2 mb-2 w-full px-2 py-1 hover:bg-surface rounded text-left">
                                        <span className={cn("font-bold text-sm", course.color)}>{course.title}</span>
                                    </button>
                                )}

                                {/* Sections */}
                                <div className="space-y-1">
                                    {course.sections.map((section, idx) => {
                                        const isExpanded = expandedSections[section.title] || searchQuery;
                                        return (
                                            <div key={idx} className="select-none">
                                                <button
                                                    onClick={() => setExpandedSections(prev => ({ ...prev, [section.title]: !prev[section.title] }))}
                                                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors uppercase tracking-wider"
                                                >
                                                    {section.title}
                                                    <ChevronRight size={12} className={cn("transition-transform", isExpanded ? "rotate-90" : "")} />
                                                </button>

                                                {/* Lessons */}
                                                {isExpanded && (
                                                    <div className="mt-1 ml-2 pl-2 border-l border-border space-y-0.5">
                                                        {section.lessons.map(lesson => (
                                                            <button
                                                                key={lesson.id}
                                                                onClick={() => {
                                                                    setActiveLessonId(lesson.id);
                                                                    if (window.innerWidth < 1024) setShowSidebar(false);
                                                                    setMobileView(VIEW_MODES.LESSON);
                                                                }}
                                                                className={cn(
                                                                    "w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between group relative",
                                                                    activeLessonId === lesson.id
                                                                        ? "bg-accent-primary/10 text-accent-primary font-medium"
                                                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                                                )}
                                                            >
                                                                <span className="truncate pr-4">{lesson.title}</span>
                                                                {completedLessons.includes(lesson.id) && (
                                                                    <CheckCircle2 size={12} className="text-accent-success shrink-0" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Mobile Overlay */}
                {showSidebar && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setShowSidebar(false)} />}


                {/* 2. CENTER (Lesson Content) */}
                <main
                    id="lesson-content"
                    className={cn(
                        "flex-1 bg-background overflow-y-auto scroll-smooth",
                        mobileView === VIEW_MODES.EDITOR ? "hidden lg:block" : "block"
                    )}
                >
                    <div className="max-w-4xl mx-auto p-6 md:p-10 pb-32">
                        {/* Header */}
                        <div className="mb-8 border-b border-border pb-6">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-3">
                                {activeLesson.title}
                            </h1>
                            <div className="flex items-center gap-4 text-xs font-medium text-text-tertiary">
                                <span className={cn("px-2 py-0.5 rounded-full bg-surface text-text-secondary border border-border")}>
                                    {activeLesson.difficulty}
                                </span>
                                <span className="flex items-center gap-1">
                                    <RotateCcw size={12} /> {activeLesson.time}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-base md:prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-code:text-accent-primary prose-code:bg-accent-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#1e1e1e] prose-pre:text-gray-100 prose-pre:border prose-pre:border-border"
                            dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                        />

                        {/* Try It CTA Block if lesson has code */}
                        {activeLesson.code && (
                            <div className="my-10 p-6 rounded-xl border border-border bg-surface/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-accent-primary/30 transition-colors">
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary mb-1">Ready to practice?</h3>
                                    <p className="text-sm text-text-secondary">Launch the code editor and experiment with the examples.</p>
                                </div>
                                <button
                                    onClick={() => { setMobileView(VIEW_MODES.EDITOR); runCode(activeLesson.code); }}
                                    className="px-6 py-2.5 bg-accent-primary text-white font-bold rounded-lg shadow-lg hover:bg-accent-primary/90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <Play size={16} fill="currentColor" /> Try it Yourself
                                </button>
                            </div>
                        )}

                        {/* Pagination Footer */}
                        <div className="flex items-center justify-between border-t border-border pt-8 mt-12 gap-4">
                            <button
                                onClick={() => navigateLesson('prev')}
                                disabled={allLessons.findIndex(l => l.id === activeLessonId) === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-text-secondary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>

                            <button
                                onClick={() => {
                                    toggleCompletion(activeLessonId);
                                    navigateLesson('next');
                                }}
                                className="flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-success text-white font-bold shadow-lg hover:bg-accent-success/90 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-wide"
                            >
                                {completedLessons.includes(activeLessonId) ? "Completed" : "Mark Complete & Next"} <CheckCircle2 size={16} />
                            </button>

                            <button
                                onClick={() => navigateLesson('next')}
                                disabled={allLessons.findIndex(l => l.id === activeLessonId) === allLessons.length - 1}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-text-secondary hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </main>


                {/* 3. RIGHT PANEL (Editor) */}
                <aside className={cn(
                    "flex flex-col bg-[#1e1e1e] border-l border-border transition-all",
                    "lg:w-[45%] lg:relative lg:block", // Desktop split
                    mobileView === VIEW_MODES.EDITOR ? "absolute inset-0 z-40" : "hidden" // Mobile Overlay
                )}>
                    {/* Toolbar */}
                    <div className="h-10 bg-[#252526] border-b border-[#333] flex items-center justify-between px-3 shrink-0">
                        <div className="flex items-center gap-0.5">
                            {['HTML', 'CSS', 'JS'].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveTab(lang)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-bold transition-colors border-t-2",
                                        activeTab === lang ? "bg-[#1e1e1e] text-white border-accent-primary" : "text-gray-500 hover:text-gray-300 border-transparent"
                                    )}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Font Size */}
                            <div className="hidden sm:flex items-center bg-[#333] rounded p-0.5">
                                <button onClick={() => setFontSize(Math.max(10, fontSize - 1))} className="p-1 hover:bg-[#444] rounded text-gray-400"><Minus size={12} /></button>
                                <span className="text-[10px] w-6 text-center text-gray-400">{fontSize}</span>
                                <button onClick={() => setFontSize(Math.min(24, fontSize + 1))} className="p-1 hover:bg-[#444] rounded text-gray-400"><Plus size={12} /></button>
                            </div>

                            <button onClick={() => runCode(code)} className="flex items-center gap-1.5 px-3 py-1 bg-accent-success/90 hover:bg-accent-success text-white text-xs font-bold rounded shadow transition-all active:scale-95">
                                <Play size={10} fill="currentColor" /> Run
                            </button>

                            {/* Mobile Close */}
                            <button onClick={() => setMobileView(VIEW_MODES.LESSON)} className="lg:hidden p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 relative border-b border-[#444] min-h-[40%]">
                        <CodeEditor
                            language={activeTab.toLowerCase() === 'js' ? 'javascript' : activeTab.toLowerCase()}
                            value={code[activeTab.toLowerCase()] || ''}
                            onChange={(val) => setCode(prev => ({ ...prev, [activeTab.toLowerCase()]: val }))}
                            theme="vs-dark"
                            fontSize={fontSize}
                        />
                    </div>

                    {/* Preview */}
                    <div className="flex-1 bg-white flex flex-col relative min-h-[30%]">
                        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-3 shrink-0">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                                <Layout size={12} /> Preview
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowConsole(!showConsole)}
                                    className={cn("p-1 rounded hover:bg-gray-200 transition-colors", showConsole ? "text-blue-600 bg-blue-100" : "text-gray-400")}
                                    title="Console"
                                >
                                    <TerminalSquare size={14} />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-black hover:bg-gray-200 rounded" onClick={() => setSrcDoc(srcDoc)} title="Refresh">
                                    <RotateCcw size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative w-full h-full bg-white">
                            <iframe
                                key={srcDoc} // Force re-render
                                title="preview"
                                srcDoc={srcDoc}
                                className="absolute inset-0 w-full h-full border-none"
                                sandbox="allow-scripts"
                            />
                        </div>

                        {/* Console */}
                        {showConsole && (
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#1e1e1e] border-t border-[#444] flex flex-col z-10 shadow-xl animate-in slide-in-from-bottom-2">
                                <div className="h-6 bg-[#252526] px-2 flex items-center justify-between border-b border-[#333]">
                                    <span className="text-[10px] font-bold text-gray-500">CONSOLE</span>
                                    <button onClick={() => setShowConsole(false)} className="text-gray-500 hover:text-white"><X size={12} /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 font-mono text-[11px] space-y-1">
                                    {logs.length === 0 && <span className="text-gray-600 italic">No output...</span>}
                                    {logs.map((log, i) => (
                                        <div key={i} className={cn("border-b border-[#333] pb-0.5 break-all", log.method === 'error' ? "text-red-400" : "text-gray-300")}>
                                            <span className="opacity-50 mr-2 select-none">$</span>
                                            {log.args.join(' ')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

            </div>
        </div>
    );
}

