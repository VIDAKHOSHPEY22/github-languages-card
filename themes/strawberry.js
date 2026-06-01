// themes/strawberry.js
const strawberryTheme = {
    name: 'strawberry',
    
    width: 500,
    height: 220,
    
    // Core Colors - Sweet Strawberry Red Palette
    bgMain: '#fff5f5',      // Very light pink-red background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#ffe5e5',       // Soft strawberry pink area
    
    // Text Colors
    textPrimary: '#8b1a1a',  // Deep strawberry red for main text
    textSecondary: '#e85c5c', // Bright strawberry pink
    textMuted: '#f0a8a8',     // Soft strawberry cream
    
    // Accent Colors - Juicy Strawberry
    accent1: '#ff4444',       // Bright strawberry red
    accent2: '#e63939',       // Deep berry red
    accentSoft: '#ff8888',    // Soft strawberry pink
    
    // Border & UI Elements
    border: '#ffd4d4',
    pillBg: '#fff5f5',
    pillBorder: '#ffd4d4',
    barBg: '#ffe5e5',
    
    // Gradients - Sweet berry glow
    gradients: {
        bgGrad: ['#fff5f5', '#ffe5e5'],
        accentGrad: ['#ff4444', '#e63939'],
        accentSoftGrad: ['#ff8888', '#ff4444']
    },
    
    borderRadius: 18,
    avatarGlow: true,
    animationSpeed: 0.5,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = strawberryTheme;