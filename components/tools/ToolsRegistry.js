import {
    Braces,
    FileCode,
    Key,
    Fingerprint,
    Hash,
    Palette,
    Regex,
    Terminal,
    Minimize2,
    FileText
} from 'lucide-react';

export const TOOLS_CATEGORIES = {
    FORMATTERS: 'Formatters',
    ENCODERS: 'Encoders & Decoders',
    GENERATORS: 'Generators',
    CONVERTERS: 'Converters',
    WEB: 'Web Tools'
};

export const TOOLS_REGISTRY = [
    {
        id: 'json-formatter',
        title: 'JSON Formatter',
        description: 'Validate, prettify, and minify your JSON data instantly.',
        icon: Braces,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-yellow-400'
    },
    {
        id: 'base64',
        title: 'Base64 Converter',
        description: 'Encode and decode text to Base64 format.',
        icon: FileCode,
        category: TOOLS_CATEGORIES.ENCODERS,
        color: 'text-blue-400'
    },
    {
        id: 'jwt-decoder',
        title: 'JWT Decoder',
        description: 'Decode JSON Web Tokens to view headers and payload.',
        icon: Key,
        category: TOOLS_CATEGORIES.ENCODERS,
        color: 'text-purple-400'
    },
    {
        id: 'uuid-generator',
        title: 'UUID Generator',
        description: 'Generate random UUIDs (v4) for your applications.',
        icon: Fingerprint,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-green-400'
    },
    {
        id: 'hash-generator',
        title: 'Hash Generator',
        description: 'Calculate MD5, SHA-1, SHA-256 hashes from text.',
        icon: Hash,
        category: TOOLS_CATEGORIES.GENERATORS,
        color: 'text-red-400'
    },
    {
        id: 'color-converter',
        title: 'Color Converter',
        description: 'Convert between HEX and RGB color formats with preview.',
        icon: Palette,
        category: TOOLS_CATEGORIES.CONVERTERS,
        color: 'text-pink-400'
    },
    {
        id: 'regex-tester',
        title: 'Regex Tester',
        description: 'Test regular expressions against text real-time.',
        icon: Regex, // Note: regex icon might not exist in older lucide, fallback to text
        category: TOOLS_CATEGORIES.WEB,
        color: 'text-orange-400'
    },
    {
        id: 'curl-converter',
        title: 'Curl to Code',
        description: 'Convert cURL commands to Fetch or Axios code.',
        icon: Terminal,
        category: TOOLS_CATEGORIES.CONVERTERS,
        color: 'text-cyan-400'
    },
    {
        id: 'minifier',
        title: 'Minify / Beautify',
        description: 'Minify or beautify JavaScript, HTML, and CSS.',
        icon: Minimize2,
        category: TOOLS_CATEGORIES.FORMATTERS,
        color: 'text-indigo-400'
    },
    {
        id: 'markdown-preview',
        title: 'Markdown Preview',
        description: 'Live preview Markdown text as HTML.',
        icon: FileText,
        category: TOOLS_CATEGORIES.WEB,
        color: 'text-white'
    }
];
