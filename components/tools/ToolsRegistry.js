
import {
    Braces,
    FileCode,
    Key,
    Fingerprint,
    Hash,
    Palette,
    Text,
    Terminal,
    Minimize2,
    FileText,
    Code2,
    Table,
    Link,
    Search,
    Wifi,
    Globe,
    Activity,
    Lock,
    Eye,
    Shuffle,
    Delete,
    Scissors,
    Type,
    Image,
    Cpu,
    Database,
    Binary,
    Code,
    Command,
    CreditCard,
    Smile,
    User,
    Mail
} from 'lucide-react';

export const TOOLS_CATEGORIES = {
    FORMATTERS: 'Formatters',
    ENCODERS: 'Encoders & Decoders',
    GENERATORS: 'Generators',
    HASHING: 'Hashing & Security',
    TEXT: 'Text Tools',
    COLOR: 'Color & Images',
    CONVERTERS: 'Converters',
    WEB: 'Web & API',
    PERFORMANCE: 'Performance & Network'
};

export const TOOLS_REGISTRY = [
    // --- FORMATTERS ---
    {
        id: 'json-formatter',
        title: 'JSON Formatter',
        description: 'Validate, prettify, and minify your JSON data instantly.',
        icon: Braces,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/10'
    },
    {
        id: 'code-beautifier',
        title: 'Code Beautifier',
        description: 'Format JS, CSS, and HTML code.',
        icon: Code2,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10'
    },
    {
        id: 'xml-formatter',
        title: 'XML Formatter',
        description: 'Prettify XML strings with proper indentation.',
        icon: Code,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-orange-400',
        bg: 'bg-orange-400/10'
    },
    {
        id: 'sql-formatter',
        title: 'SQL Formatter',
        description: 'Format messy SQL queries code.',
        icon: Database,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-teal-400',
        bg: 'bg-teal-400/10'
    },
    {
        id: 'yaml-formatter',
        title: 'YAML Formatter',
        description: 'Validate and format YAML files.',
        icon: Table,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-red-400',
        bg: 'bg-red-400/10'
    },

    // --- ENCODERS ---
    {
        id: 'base64',
        title: 'Base64 Converter',
        description: 'Encode and decode text to Base64 format.',
        icon: FileCode,
        category: TOOLS_CATEGORIES.ENCODERS,
        color: 'text-indigo-400',
        bg: 'bg-indigo-400/10'
    },
    {
        id: 'jwt-decoder',
        title: 'JWT Decoder',
        description: 'Decode JSON Web Tokens payload.',
        icon: Key,
        category: TOOLS_CATEGORIES.ENCODERS,
        color: 'text-purple-400',
        bg: 'bg-purple-400/10'
    },
    {
        id: 'url-encoder',
        title: 'URL Encoder',
        description: 'Encode or decode URL parameters.',
        icon: Link,
        category: TOOLS_CATEGORIES.ENCODERS,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10'
    },
    {
        id: 'html-entity',
        title: 'HTML Entity',
        description: 'Escape or unescape HTML entities.',
        icon: Code,
        category: TOOLS_CATEGORIES.ENCODERS,
        color: 'text-pink-400',
        bg: 'bg-pink-400/10'
    },

    // --- GENERATORS ---
    {
        id: 'uuid-generator',
        title: 'UUID Generator',
        description: 'Generate random UUIDs (v4).',
        icon: Fingerprint,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-green-400',
        bg: 'bg-green-400/10'
    },
    {
        id: 'random-string',
        title: 'Random String',
        description: 'Generate secure random strings.',
        icon: Shuffle,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-lime-400',
        bg: 'bg-lime-400/10'
    },
    {
        id: 'password-generator',
        title: 'Password Gen',
        description: 'Create strong, secure passwords.',
        icon: Lock,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/10'
    },
    {
        id: 'fake-data',
        title: 'Fake Data',
        description: 'Generate names, emails, and addresses.',
        icon: User,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-amber-400',
        bg: 'bg-amber-400/10'
    },
    {
        id: 'lorem-ipsum',
        title: 'Lorem Ipsum',
        description: 'Generate placeholder text.',
        icon: Type,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-gray-400',
        bg: 'bg-gray-400/10'
    },

    // --- HASHING ---
    {
        id: 'hash-generator',
        title: 'Hash Generator',
        description: 'Calculate MD5, SHA-1, SHA-256.',
        icon: Hash,
        category: TOOLS_CATEGORIES.HASHING,
        color: 'text-red-500',
        bg: 'bg-red-500/10'
    },
    {
        id: 'bcrypt-generator',
        title: 'Bcrypt Hash',
        description: 'Generate and check Bcrypt hashes.',
        icon: ShieldCheck,
        category: TOOLS_CATEGORIES.HASHING,
        color: 'text-rose-400',
        bg: 'bg-rose-400/10'
    },

    // --- TEXT ---
    {
        id: 'case-converter',
        title: 'Case Converter',
        description: 'Camel, Snake, Kebab, Pascal case.',
        icon: Type,
        category: TOOLS_CATEGORIES.TEXT,
        color: 'text-violet-400',
        bg: 'bg-violet-400/10'
    },
    {
        id: 'word-counter',
        title: 'Word Counter',
        description: 'Count words, chars, and lines.',
        icon: Text,
        category: TOOLS_CATEGORIES.TEXT,
        color: 'text-fuchsia-400',
        bg: 'bg-fuchsia-400/10'
    },
    {
        id: 'remove-duplicates',
        title: 'Dedup Lines',
        description: 'Remove duplicate lines from text.',
        icon: Delete,
        category: TOOLS_CATEGORIES.TEXT,
        color: 'text-slate-400',
        bg: 'bg-slate-400/10'
    },
    {
        id: 'diff-checker',
        title: 'Diff Checker',
        description: 'Compare two text files side by side.',
        icon: Scissors,
        category: TOOLS_CATEGORIES.TEXT,
        color: 'text-sky-400',
        bg: 'bg-sky-400/10'
    },

    // --- COLOR ---
    {
        id: 'color-converter',
        title: 'Color Converter',
        description: 'HEX, RGB, HSL conversion.',
        icon: Palette,
        category: TOOLS_CATEGORIES.COLOR,
        color: 'text-pink-500',
        bg: 'bg-pink-500/10'
    },
    {
        id: 'gradient-generator',
        title: 'Gradient Gen',
        description: 'Create CSS gradients visually.',
        icon: Image,
        category: TOOLS_CATEGORIES.COLOR,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },

    // --- CONVERTERS ---
    {
        id: 'curl-converter',
        title: 'Curl to Code',
        description: 'Convert cURL to Fetch/Axios.',
        icon: Terminal,
        category: TOOLS_CATEGORIES.CONVERTERS,
        color: 'text-cyan-400',
        bg: 'bg-cyan-400/10'
    },
    {
        id: 'json-to-ts',
        title: 'JSON to TS',
        description: 'Generate TypeScript interfaces.',
        icon: FileCode,
        category: TOOLS_CATEGORIES.CONVERTERS,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        id: 'csv-to-json',
        title: 'CSV to JSON',
        description: 'Convert CSV data to JSON.',
        icon: Table,
        category: TOOLS_CATEGORIES.CONVERTERS,
        color: 'text-green-500',
        bg: 'bg-green-500/10'
    },

    // --- WEB ---
    {
        id: 'regex-tester',
        title: 'Regex Tester',
        description: 'Test RegExp against text.',
        icon: Search,
        category: TOOLS_CATEGORIES.WEB,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10'
    },
    {
        id: 'markdown-preview',
        title: 'Markdown',
        description: 'Live Markdown to HTML preview.',
        icon: FileText,
        category: TOOLS_CATEGORIES.WEB,
        color: 'text-white',
        bg: 'bg-white/10'
    },
    {
        id: 'meta-generator',
        title: 'Meta Tags',
        description: 'Generate SEO meta tags.',
        icon: Globe,
        category: TOOLS_CATEGORIES.WEB,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10'
    },
    {
        id: 'status-codes',
        title: 'HTTP Status',
        description: 'Lookup HTTP status codes.',
        icon: Activity,
        category: TOOLS_CATEGORIES.WEB,
        color: 'text-red-400',
        bg: 'bg-red-400/10'
    },

    // --- PERFORMANCE ---
    {
        id: 'dns-lookup',
        title: 'DNS Lookup',
        description: 'Check DNS records for a domain.',
        icon: Globe,
        category: TOOLS_CATEGORIES.PERFORMANCE,
        color: 'text-blue-400',
        bg: 'bg-blue-400/10'
    },
    {
        id: 'ip-lookup',
        title: 'IP Lookup',
        description: 'Get details about an IP address.',
        icon: MapPin,
        category: TOOLS_CATEGORIES.PERFORMANCE,
        color: 'text-teal-400',
        bg: 'bg-teal-400/10'
    },
    {
        id: 'ping-test',
        title: 'Ping Test',
        description: 'Check website availability.',
        icon: Wifi,
        category: TOOLS_CATEGORIES.PERFORMANCE,
        color: 'text-green-400',
        bg: 'bg-green-400/10'
    }
];

// Import specific icons that might be missing in default import if needed
import { ShieldCheck, MapPin } from 'lucide-react';
