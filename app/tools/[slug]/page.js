"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { TOOLS_REGISTRY } from '@/components/tools/ToolsRegistry';
import { notFound } from 'next/navigation';
import ComingSoon from '@/components/tools/impl/ComingSoon';
import { ChevronRight, Home, Share2, Star } from 'lucide-react';
import Link from 'next/link';

// Dynamic Imports with loading states
const JsonFormatter = dynamic(() => import('@/components/tools/impl/JsonFormatter'), { loading: () => <ToolLoader /> });
const Base64Converter = dynamic(() => import('@/components/tools/impl/Base64Converter'), { loading: () => <ToolLoader /> });
const JwtDecoder = dynamic(() => import('@/components/tools/impl/JwtDecoder'), { loading: () => <ToolLoader /> });
const UuidGenerator = dynamic(() => import('@/components/tools/impl/UuidGenerator'), { loading: () => <ToolLoader /> });
const HashGenerator = dynamic(() => import('@/components/tools/impl/HashGenerator'), { loading: () => <ToolLoader /> });
const ColorConverter = dynamic(() => import('@/components/tools/impl/ColorConverter'), { loading: () => <ToolLoader /> });
const RegexTester = dynamic(() => import('@/components/tools/impl/RegexTester'), { loading: () => <ToolLoader /> });
const CurlConverter = dynamic(() => import('@/components/tools/impl/CurlConverter'), { loading: () => <ToolLoader /> });
const Minifier = dynamic(() => import('@/components/tools/impl/Minifier'), { loading: () => <ToolLoader /> });
const MarkdownPreview = dynamic(() => import('@/components/tools/impl/MarkdownPreview'), { loading: () => <ToolLoader /> });
const WordCounter = dynamic(() => import('@/components/tools/impl/WordCounter'), { loading: () => <ToolLoader /> });
const CaseConverter = dynamic(() => import('@/components/tools/impl/CaseConverter'), { loading: () => <ToolLoader /> });
const RemoveDuplicates = dynamic(() => import('@/components/tools/impl/RemoveDuplicates'), { loading: () => <ToolLoader /> });
const PasswordGenerator = dynamic(() => import('@/components/tools/impl/PasswordGenerator'), { loading: () => <ToolLoader /> });
const LoremIpsum = dynamic(() => import('@/components/tools/impl/LoremIpsum'), { loading: () => <ToolLoader /> });
const UrlEncoder = dynamic(() => import('@/components/tools/impl/UrlEncoder'), { loading: () => <ToolLoader /> });
const HtmlEntity = dynamic(() => import('@/components/tools/impl/HtmlEntity'), { loading: () => <ToolLoader /> });
const XmlFormatter = dynamic(() => import('@/components/tools/impl/XmlFormatter'), { loading: () => <ToolLoader /> });
const SqlFormatter = dynamic(() => import('@/components/tools/impl/SqlFormatter'), { loading: () => <ToolLoader /> });
const CsvToJson = dynamic(() => import('@/components/tools/impl/CsvToJson'), { loading: () => <ToolLoader /> });
const RandomString = dynamic(() => import('@/components/tools/impl/RandomString'), { loading: () => <ToolLoader /> });
const JsonToTs = dynamic(() => import('@/components/tools/impl/JsonToTs'), { loading: () => <ToolLoader /> });
const FakeData = dynamic(() => import('@/components/tools/impl/FakeData'), { loading: () => <ToolLoader /> });
const DiffChecker = dynamic(() => import('@/components/tools/impl/DiffChecker'), { loading: () => <ToolLoader /> });
const IpLookup = dynamic(() => import('@/components/tools/impl/IpLookup'), { loading: () => <ToolLoader /> });
const HttpStatus = dynamic(() => import('@/components/tools/impl/HttpStatus'), { loading: () => <ToolLoader /> });
const PasswordStrength = dynamic(() => import('@/components/tools/impl/PasswordStrength'), { loading: () => <ToolLoader /> });
const TokenGenerator = dynamic(() => import('@/components/tools/impl/TokenGenerator'), { loading: () => <ToolLoader /> });
const UlidGenerator = dynamic(() => import('@/components/tools/impl/UlidGenerator'), { loading: () => <ToolLoader /> });
const BcryptGenerator = dynamic(() => import('@/components/tools/impl/BcryptGenerator'), { loading: () => <ToolLoader /> });
const HmacGenerator = dynamic(() => import('@/components/tools/impl/HmacGenerator'), { loading: () => <ToolLoader /> });
const Bip39Generator = dynamic(() => import('@/components/tools/impl/Bip39Generator'), { loading: () => <ToolLoader /> });
const OtpGenerator = dynamic(() => import('@/components/tools/impl/OtpGenerator'), { loading: () => <ToolLoader /> });
const RsaGenerator = dynamic(() => import('@/components/tools/impl/RsaGenerator'), { loading: () => <ToolLoader /> });
const QrCodeGenerator = dynamic(() => import('@/components/tools/impl/QrCodeGenerator'), { loading: () => <ToolLoader /> });
const WifiQrGenerator = dynamic(() => import('@/components/tools/impl/WifiQrCodeGenerator'), { loading: () => <ToolLoader /> });
const EncryptDecrypt = dynamic(() => import('@/components/tools/impl/EncryptDecrypt'), { loading: () => <ToolLoader /> });

const COMPONENT_MAP = {
    'json-formatter': JsonFormatter,
    'base64': Base64Converter,
    'jwt-decoder': JwtDecoder,
    'uuid-generator': UuidGenerator,
    'hash-generator': HashGenerator,
    'bcrypt-generator': BcryptGenerator,
    'hmac-generator': HmacGenerator,
    'bip39-generator': Bip39Generator,
    'otp-generator': OtpGenerator,
    'rsa-generator': RsaGenerator,
    'qr-code': QrCodeGenerator,
    'wifi-qr': WifiQrGenerator,
    'encrypt-decrypt': EncryptDecrypt,
    'color-converter': ColorConverter,
    'regex-tester': RegexTester,
    'curl-converter': CurlConverter,
    'code-beautifier': Minifier,
    'markdown-preview': MarkdownPreview,
    'word-counter': WordCounter,
    'case-converter': CaseConverter,
    'remove-duplicates': RemoveDuplicates,
    'password-generator': PasswordGenerator,
    'lorem-ipsum': LoremIpsum,
    'url-encoder': UrlEncoder,
    'html-entity': HtmlEntity,
    'xml-formatter': XmlFormatter,
    'sql-formatter': SqlFormatter,
    'csv-to-json': CsvToJson,
    'random-string': RandomString,
    'json-to-ts': JsonToTs,
    'fake-data': FakeData,
    'diff-checker': DiffChecker,
    'ip-lookup': IpLookup,
    'http-status': HttpStatus,
    'password-strength': PasswordStrength,
    'token-generator': TokenGenerator,
    'ulid-generator': UlidGenerator,
};

function ToolLoader() {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 bg-surface/50 rounded-xl mb-4"></div>
            <div className="h-4 w-32 bg-surface/50 rounded mb-2"></div>
            <div className="h-3 w-48 bg-surface/30 rounded"></div>
        </div>
    );
}

export default function ToolPage({ params }) {
    const { slug } = React.use(params);
    const tool = useMemo(() => TOOLS_REGISTRY.find(t => t.id === slug), [slug]);

    if (!tool) {
        notFound();
    }

    const ActiveComponent = COMPONENT_MAP[tool.id] || ComingSoon;

    return (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-text-tertiary">
                <Link href="/tools" className="hover:text-text-primary transition-colors flex items-center gap-1">
                    <Home size={12} /> Tools
                </Link>
                <ChevronRight size={10} />
                <span className="hover:text-text-primary transition-colors cursor-default">{tool.category}</span>
                <ChevronRight size={10} />
                <span className="text-text-primary font-medium">{tool.title}</span>
            </nav>

            {/* Header */}
            <header className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-surface border border-border p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-primary/10 transition-colors"></div>

                <div className="flex items-start gap-5 relative z-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <tool.icon size={28} className="md:w-8 md:h-8" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">{tool.title}</h1>
                        <p className="text-sm md:text-base text-text-secondary max-w-xl leading-relaxed">{tool.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 relative z-10 self-end md:self-center">
                    <button className="p-2 text-text-tertiary hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors" title="Add to favorites">
                        <Star size={18} />
                    </button>
                    <button className="p-2 text-text-tertiary hover:text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-colors" title="Share tool">
                        <Share2 size={18} />
                    </button>
                </div>
            </header>

            {/* Tool Area */}
            <section className="bg-surface border border-border rounded-2xl md:rounded-3xl p-1 md:p-8 shadow-sm relative min-h-[400px]">
                {/* Only loading styling handled by Suspense/Loader if needed, here we just render component */}
                <div className="relative z-10">
                    <ActiveComponent />
                </div>
            </section>
        </div>
    );
}
