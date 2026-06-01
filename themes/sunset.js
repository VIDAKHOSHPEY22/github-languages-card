// themes/sunset.js
const sunsetTheme = {
    name: 'sunset',
    
    width: 500,
    height: 220,
    
    // Core Colors - Light Yellow & Bright Morning Palette
    bgMain: '#fffff0',      // Ivory yellow background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#fffde7',       // Very light yellow cream
    
    // Text Colors - Warm yellow-brown tones
    textPrimary: '#6b5a1a',  // Soft yellow-brown for main text
    textSecondary: '#b8a948', // Warm golden yellow
    textMuted: '#ded187',     // Light butter yellow
    
    // Accent Colors - Pure Yellow (No Orange!)
    accent1: '#ffd700',       // Bright pure gold yellow
    accent2: '#f5c542',       // Soft golden yellow
    accentSoft: '#fff176',    // Light butter yellow
    
    // Border & UI Elements
    border: '#fff9c4',
    pillBg: '#fffff0',
    pillBorder: '#fff9c4',
    barBg: '#fffde7',
    
    // Gradients - Gentle morning yellow
    gradients: {
        bgGrad: ['#fffff0', '#fffde7'],
        accentGrad: ['#ffd700', '#f5c542'],
        accentSoftGrad: ['#fff176', '#ffd700']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = sunsetTheme;