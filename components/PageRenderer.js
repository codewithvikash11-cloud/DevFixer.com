import React from 'react';
import Hero from './sections/Hero';
import Features from './sections/Features';
import RichText from './sections/RichText';
import Faq from './sections/Faq';

export default function PageRenderer({ content }) {
    let sections = [];
    let isLegacy = false;

    // Attempt to parse JSON
    if (content && content.trim().startsWith('[')) {
        try {
            sections = JSON.parse(content);
            if (!Array.isArray(sections)) {
                isLegacy = true;
            }
        } catch (e) {
            isLegacy = true;
        }
    } else {
        isLegacy = true;
    }

    // New Page Builder Format
    if (!isLegacy) {
        return (
            <div className="flex flex-col">
                {sections.map((section, index) => {
                    const Component = getComponent(section.type);
                    if (!Component) return null;
                    return <Component key={index} data={section.data} />;
                })}
            </div>
        );
    }

    // Legacy / Just HTML
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <header className="mb-8 text-center hidden">
                {/* Title is handled by page.js header, but layout might differ for legacy vs builder. 
                    For legacy, we keep the wrapper. For builder, components handle their own width.
                */}
            </header>
            <RichText data={{ content }} />
        </div>
    );
}

function getComponent(type) {
    switch (type) {
        case 'hero': return Hero;
        case 'features': return Features;
        case 'rich-text': return RichText;
        case 'faq': return Faq;
        default: return null;
    }
}
