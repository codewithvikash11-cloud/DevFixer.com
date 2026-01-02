"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import MobileMenu from '@/components/MobileMenu';
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
    Maximize2
} from 'lucide-react';
import CodeEditor from '@/components/compiler/CodeEditor';
import { cn } from '@/lib/utils';

const VIEW_MODES = {
    LESSON: 'lesson',
    EDITOR: 'editor'
};

export default function LearnPage() {
    // STATE: Navigation
    const [activeCourseId, setActiveCourseId] = useState('html');
    const [activeChapterId, setActiveChapterId] = useState('html-intro');

    // STATE: UI
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);
    const [mobileView, setMobileView] = useState(VIEW_MODES.LESSON);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConsole, setShowConsole] = useState(false);

    // STATE: Editor
    const [code, setCode] = useState({ html: '', css: '', js: '' });
    const [activeTab, setActiveTab] = useState('HTML');
    const [srcDoc, setSrcDoc] = useState('');
    const [logs, setLogs] = useState([]); // Console logs

    // STATE: Persistence
    const [completedChapters, setCompletedChapters] = useState([]);
    const [bookmarkedChapters, setBookmarkedChapters] = useState([]);

    // --- DERIVED DATA ---
    const activeCourse = useMemo(() => CURRICULUM.find(c => c.id === activeCourseId) || CURRICULUM[0], [activeCourseId]);
    const activeChapter = useMemo(() => activeCourse.chapters.find(c => c.id === activeChapterId) || activeCourse.chapters[0], [activeCourse, activeChapterId]);

    const filteredCurriculum = useMemo(() => {
        if (!searchQuery) return CURRICULUM;
        return CURRICULUM.map(course => ({
            ...course,
            chapters: course.chapters.filter(ch =>
                ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(c => c.chapters.length > 0);
    }, [searchQuery]);

    // --- EFFECTS ---

    // 1. Load Persistence on Mount
    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('codeorbit_learn_progress');
            if (savedProgress) setCompletedChapters(JSON.parse(savedProgress));

            const savedBookmarks = localStorage.getItem('codeorbit_learn_bookmarks');
            if (savedBookmarks) setBookmarkedChapters(JSON.parse(savedBookmarks));
        } catch (e) {
            console.error("Failed to load persistence", e);
        }
    }, []);

    // 2. Load Chapter Content into Editor
    useEffect(() => {
        if (activeChapter?.code) {
            setCode(activeChapter.code);
            setLogs([]); // Clear logs on chapter change
        }
    }, [activeChapter]);

    // 3. Listen for Console Messages from Iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'console') {
                setLogs(prev => [...prev, { method: event.data.method, args: event.data.args }]);
                setShowConsole(true); // Auto-open console on new log
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // --- HANDLERS ---

    const runCode = (codeToRun = code) => {
        setLogs([]); // Clear previous logs

        // Use a simpler string construction to avoid potential template literal parser issues in some environments
        const htmlContent = codeToRun.html || '';
        const cssContent = codeToRun.css || '';
        const jsContent = codeToRun.js || '';

        const scriptInterceptor = `
            <script>
                const originalLog = console.log;
                const originalError = console.error;
                const originalWarn = console.warn;

                function sendToParent(method, args) {
                    try {
                        parent.postMessage({ type: 'console', method: method, args: args.map(String) }, '*');
                    } catch(e) {}
                }

                console.log = function(...args) {
                    sendToParent('log', args);
                    originalLog.apply(console, args);
                };
                console.error = function(...args) {
                    sendToParent('error', args);
                    originalError.apply(console, args);
                };
                console.warn = function(...args) {
                    sendToParent('warn', args);
                    originalWarn.apply(console, args);
                };

                window.onerror = function(msg, url, line) {
                    sendToParent('error', [msg]);
                };
            </script>
        `;

        const result = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>${cssContent}</style>
                </head>
                <body>
                    ${htmlContent}
                    ${scriptInterceptor}
                    <script>${jsContent}</script>
                </body>
            </html>
        `;
        setSrcDoc(result);
    };

    // Initial Run when code sets
    useEffect(() => {
        const timeout = setTimeout(() => runCode(code), 500); // 500ms debounce
        return () => clearTimeout(timeout);
    }, [code]);

    const handleChapterSelect = (courseId, chapterId) => {
        setActiveCourseId(courseId);
        setActiveChapterId(chapterId);
        setMobileView(VIEW_MODES.LESSON);
        if (window.innerWidth < 768) setShowSidebar(false);
    };

    const toggleChapterCompletion = (e, chapterId) => {
        e.stopPropagation();
        let newCompleted;
        if (completedChapters.includes(chapterId)) {
            newCompleted = completedChapters.filter(id => id !== chapterId);
        } else {
            newCompleted = [...completedChapters, chapterId];
        }
        setCompletedChapters(newCompleted);
        localStorage.setItem('codeorbit_learn_progress', JSON.stringify(newCompleted));
    };

    const toggleBookmark = (e) => {
        e?.stopPropagation();
        let newBookmarks;
        const id = activeChapterId;
        if (bookmarkedChapters.includes(id)) {
            newBookmarks = bookmarkedChapters.filter(bId => bId !== id);
        } else {
            newBookmarks = [...bookmarkedChapters, id];
        }
        setBookmarkedChapters(newBookmarks);
        localStorage.setItem('codeorbit_learn_bookmarks', JSON.stringify(newBookmarks));
    };

    const navigateChapter = (direction) => {
        const currentChapterIndex = activeCourse.chapters.findIndex(c => c.id === activeChapterId);
        let nextIndex = direction === 'next' ? currentChapterIndex + 1 : currentChapterIndex - 1;

        if (nextIndex >= 0 && nextIndex < activeCourse.chapters.length) {
            setActiveChapterId(activeCourse.chapters[nextIndex].id);
            document.getElementById('lesson-content')?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleTryIt = () => {
        setMobileView(VIEW_MODES.EDITOR);
        // Force run code to ensure updated preview
        runCode(activeChapter.code);
    };

    // Calculate Progress
    const courseProgress = useMemo(() => {
        const total = activeCourse.chapters.length;
        if (total === 0) return 0;
        const completed = activeCourse.chapters.filter(ch => completedChapters.includes(ch.id)).length;
        return Math.round((completed / total) * 100);
    }, [activeCourse, completedChapters]);

    const isBookmarked = bookmarkedChapters.includes(activeChapterId);

    return (
        <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden lg:pl-20 pt-16 md:pt-20">
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            {/* TOP HEADER */}
            <header className="h-14 border-b border-border bg-panel flex items-center justify-between px-4 md:px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden text-text-secondary hover:text-text-primary">
                        <Menu size={20} />
                    </button>

                    {/* BREADCRUMBS */}
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <div className="hidden md:flex items-center gap-2 text-text-secondary">
                            {typeof activeCourse.icon === 'string' ? (
                                <img src={activeCourse.icon} alt="" className="w-4 h-4 object-contain" />
                            ) : (
                                <activeCourse.icon size={16} className={cn(activeCourse.color)} />
                            )}
                            <span>{activeCourse.title}</span>
                            <ChevronRight size={14} />
                        </div>
                        <span className="text-text-primary font-bold truncate max-w-[150px] md:max-w-none">
                            {activeChapter.title}
                        </span>

                        {/* Bookmark Toggle */}
                        <button
                            onClick={toggleBookmark}
                            className={cn("ml-2 hover:scale-110 transition-transform", isBookmarked ? "text-yellow-400" : "text-text-tertiary hover:text-yellow-400")}
                            title={isBookmarked ? "Remove Bookmark" : "Bookmark Lesson"}
                        >
                            <Star size={16} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>

                {/* CENTER: Mobile Toggle */}
                <div className="flex lg:hidden bg-surface p-1 rounded-lg">
                    <button
                        onClick={() => setMobileView(VIEW_MODES.LESSON)}
                        className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", mobileView === VIEW_MODES.LESSON ? "bg-accent-primary text-white" : "text-text-secondary")}
                    >
                        Lesson
                    </button>
                    <button
                        onClick={() => setMobileView(VIEW_MODES.EDITOR)}
                        className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", mobileView === VIEW_MODES.EDITOR ? "bg-accent-primary text-white" : "text-text-secondary")}
                    >
                        Editor
                    </button>
                </div>

                {/* RIGHT: Progress & Actions */}
                <div className="flex items-center gap-4">
                    {/* Desktop Progress */}
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                            Progress {courseProgress}%
                        </div>
                        <div className="w-24 h-1.5 bg-surface rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent-primary transition-all duration-500"
                                style={{ width: `${courseProgress}%` }}
                            />
                        </div>
                    </div>

                    {/* Saved Indicator */}
                    <div
                        className="hidden md:flex items-center gap-2 text-xs font-bold text-accent-success bg-accent-success/10 px-3 py-1.5 rounded-full hover:bg-accent-success/20 transition-colors cursor-default"
                        title="Progress Auto-Saved"
                    >
                        <Save size={14} />
                        <span>Saved</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden relative">

                {/* 1. LEFT SIDEBAR (Curriculum) */}
                <aside className={cn(
                    "w-72 border-r border-border bg-panel flex flex-col transition-all duration-300 absolute md:relative z-30 h-full",
                    showSidebar ? "translate-x-0" : "-translate-x-full md:w-0 md:translate-x-0 md:border-none md:overflow-hidden",
                    "md:relative md:translate-x-0" // Reset for desktop
                )}>
                    <div className={cn("flex flex-col h-full bg-panel", !showSidebar && "md:hidden")}>

                        {/* Search Box */}
                        <div className="p-4 border-b border-border sticky top-0 bg-panel z-10">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                                <input
                                    type="text"
                                    placeholder="Search lessons..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-xs font-medium text-text-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {filteredCurriculum.map(course => (
                                <div key={course.id} className="mb-2">
                                    <button
                                        onClick={() => setActiveCourseId(course.id === activeCourseId ? null : course.id)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface group transition-colors"
                                    >
                                        <div className="flex items-center gap-3 font-bold text-sm">
                                            {typeof course.icon === 'string' ? (
                                                <img src={course.icon} alt="" className={cn("w-4 h-4 object-contain transition-all", course.id !== activeCourseId && "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100")} />
                                            ) : (
                                                <course.icon size={16} className={cn(course.id === activeCourseId ? course.color : "text-text-secondary")} />
                                            )}
                                            <span className={cn(course.id === activeCourseId ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary")}>
                                                {course.title}
                                            </span>
                                        </div>
                                        {/* Show chevron */}
                                        <ChevronRight size={14} className={cn("text-text-tertiary transition-transform", course.id === activeCourseId && "rotate-90")} />
                                    </button>

                                    {/* Chapters Expansion */}
                                    {course.id === activeCourseId && (
                                        <div className="ml-4 pl-3 border-l border-border mt-1 space-y-0.5 animate-in slide-in-from-left-2 duration-200">
                                            {course.chapters.map(chapter => (
                                                <div
                                                    key={chapter.id}
                                                    className={cn(
                                                        "group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors",
                                                        activeChapterId === chapter.id
                                                            ? "bg-accent-primary/10 text-accent-primary"
                                                            : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                                    )}
                                                    onClick={() => handleChapterSelect(course.id, chapter.id)}
                                                >
                                                    <div className="flex items-center gap-2 truncate">
                                                        {bookmarkedChapters.includes(chapter.id) && <Star size={10} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                                                        <span className="text-xs font-medium truncate">{chapter.title}</span>
                                                    </div>

                                                    {/* Completion Checkbox */}
                                                    <button
                                                        onClick={(e) => toggleChapterCompletion(e, chapter.id)}
                                                        className={cn(
                                                            "opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-background",
                                                            completedChapters.includes(chapter.id) && "opacity-100 text-accent-success"
                                                        )}
                                                        title="Mark as completed"
                                                    >
                                                        <CheckCircle2 size={12} fill={completedChapters.includes(chapter.id) ? "currentColor" : "none"} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* 2. CENTER CONTENT (Lesson) */}
                <main
                    id="lesson-content"
                    className={cn(
                        "flex-1 overflow-y-auto bg-background p-6 md:p-8 min-w-0 transition-opacity scroll-smooth",
                        mobileView === VIEW_MODES.EDITOR ? "hidden lg:block" : "block"
                    )}
                >
                    <div className="max-w-3xl mx-auto space-y-8 pb-20">
                        {/* Title Block */}
                        <div className="border-b border-border pb-6">
                            <h1 className="text-3xl md:text-4xl font-black text-text-primary mb-2 tracking-tight">
                                {activeChapter.title}
                            </h1>
                            <div className="flex items-center gap-4 text-xs font-medium text-text-tertiary">
                                <span className="flex items-center gap-1">
                                    {typeof activeCourse.icon === 'string' ? (
                                        <img src={activeCourse.icon} alt="" className="w-3 h-3 object-contain mr-1" />
                                    ) : (
                                        <activeCourse.icon size={12} />
                                    )}
                                    {activeCourse.title}
                                </span>
                                <span>•</span>
                                <span>{activeCourse.chapters.findIndex(c => c.id === activeChapterId) + 1} / {activeCourse.chapters.length}</span>
                            </div>
                        </div>

                        {/* Content Injection */}
                        <article
                            className="prose prose-invert prose-p:text-text-secondary prose-headings:text-text-primary prose-code:text-accent-primary prose-code:bg-surface prose-code:px-1 prose-code:py-0.5 prose-code:rounded max-w-none"
                            dangerouslySetInnerHTML={{ __html: activeChapter.content }}
                        />

                        {/* Try It CTA */}
                        {activeChapter.code && (
                            <div className="mt-8 p-6 bg-surface/50 border border-border rounded-xl flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-text-primary mb-1">Interactive Example</h3>
                                    <p className="text-xs text-text-secondary">Edit the code to see how it works.</p>
                                </div>
                                <button
                                    onClick={handleTryIt}
                                    className="px-5 py-2.5 bg-accent-primary text-white text-sm font-bold rounded-lg hover:bg-accent-primary/90 flex items-center gap-2 shadow-lg shadow-accent-primary/20 transition-all hover:scale-105"
                                >
                                    <Play size={16} /> Try it Yourself
                                </button>
                            </div>
                        )}

                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between pt-8 border-t border-border mt-12">
                            <button
                                onClick={() => navigateChapter('prev')}
                                disabled={activeCourse.chapters.findIndex(c => c.id === activeChapterId) === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-bold text-text-secondary hover:bg-surface hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>

                            <button
                                onClick={() => navigateChapter('next')}
                                disabled={activeCourse.chapters.findIndex(c => c.id === activeChapterId) === activeCourse.chapters.length - 1}
                                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent-primary text-white text-sm font-bold hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-accent-primary/20"
                            >
                                Next Lesson <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </main>

                {/* 3. RIGHT PANEL (Editor) */}
                <aside className={cn(
                    "flex flex-col border-l border-border bg-[#1e1e1e] transition-all relative",
                    "lg:w-[45%] lg:flex",
                    mobileView === VIEW_MODES.EDITOR ? "absolute inset-0 z-20 w-full flex" : "hidden"
                )}>
                    {/* Editor Tabs */}
                    <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-[#333] shrink-0">
                        <div className="flex items-center gap-1">
                            {['HTML', 'CSS', 'JS'].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveTab(lang)}
                                    className={cn(
                                        "px-3 py-1 text-xs font-bold border-t-2 transition-colors",
                                        activeTab === lang
                                            ? "border-accent-primary bg-[#1e1e1e] text-white"
                                            : "border-transparent text-gray-400 hover:text-gray-300"
                                    )}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => runCode(code)}
                                className="flex items-center gap-2 px-4 py-1.5 bg-[#008000] hover:bg-[#006600] text-white text-xs font-bold rounded shadow-[0_0_15px_rgba(0,128,0,0.4)] transition-all"
                            >
                                <Play size={12} fill="currentColor" /> Run
                            </button>
                            <button onClick={() => setMobileView(VIEW_MODES.LESSON)} className="lg:hidden p-1 text-white hover:bg-white/10 rounded"><X size={16} /></button>
                        </div>
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1 relative border-b border-[#333] min-h-[30%]">
                        <CodeEditor
                            language={activeTab.toLowerCase() === 'js' ? 'javascript' : activeTab.toLowerCase()}
                            value={code[activeTab.toLowerCase()] || ''}
                            onChange={(val) => setCode(prev => ({ ...prev, [activeTab.toLowerCase()]: val }))}
                            theme="vs-dark"
                        />
                    </div>

                    {/* Preview & Console */}
                    <div className="flex-1 bg-white flex flex-col min-h-[30%] relative">
                        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4 justify-between shrink-0">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Result Preview</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-400">1024x768</span>
                                <button
                                    onClick={() => setShowConsole(!showConsole)}
                                    className={cn("p-1 rounded hover:bg-gray-200 transition-colors", showConsole ? "text-blue-600 bg-blue-100" : "text-gray-400")}
                                    title="Toggle Console"
                                >
                                    <TerminalSquare size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <iframe
                                srcDoc={srcDoc}
                                className="absolute inset-0 w-full h-full border-none bg-white"
                                sandbox="allow-scripts"
                                title="Preview"
                            />
                        </div>

                        {/* Console Panel (Collapsible) */}
                        {showConsole && (
                            <div className="h-40 bg-[#1e1e1e] border-t border-[#333] flex flex-col shrink-0">
                                <div className="h-7 bg-[#252526] px-2 flex items-center justify-between border-b border-[#333]">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Console Output</span>
                                    <button onClick={() => setShowConsole(false)} className="text-gray-400 hover:text-white"><X size={12} /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
                                    {logs.length === 0 && <span className="text-gray-600 italic">No logs...</span>}
                                    {logs.map((log, i) => (
                                        <div key={i} className={cn("border-b border-[#333] pb-0.5", log.method === 'error' ? "text-red-400" : log.method === 'warn' ? "text-yellow-400" : "text-gray-300")}>
                                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
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
