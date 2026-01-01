"use client";

import Logo from './Logo';

// Re-export the main logo as CodeOrbitLogo for compatibility
// This ensures alignment across the app
export default function CodeOrbitLogo(props) {
    return <Logo {...props} />;
}
