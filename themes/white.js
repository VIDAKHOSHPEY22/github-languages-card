// themes/white.js
const whiteTheme = {
    name: 'white',
    
    width: 500,
    height: 220,
    
    // Core Colors - Pure Minimal White
    bgMain: '#ffffff',      // Pure white background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#fafafa',       // Soft white area
    
    // Text Colors - Light Gray Scale
    textPrimary: '#1a1a1a',  // Dark gray for main text
    textSecondary: '#888888', // Medium gray
    textMuted: '#cccccc',     // Light gray
    
    // Accent Colors - Silver Gray
    accent1: '#e0e0e0',       // Light silver
    accent2: '#bdbdbd',       // Medium silver
    accentSoft: '#eeeeee',    // Very soft silver
    
    // Border & UI Elements
    border: '#eaeaea',
    pillBg: '#f5f5f5',
    pillBorder: '#eaeaea',
    barBg: '#f5f5f5',
    
    // Gradients - Subtle silver
    gradients: {
        bgGrad: ['#ffffff', '#fafafa'],
        accentGrad: ['#e0e0e0', '#bdbdbd'],
        accentSoftGrad: ['#eeeeee', '#e0e0e0']
    },
    
    borderRadius: 16,
    avatarGlow: false,
    animationSpeed: 0.3,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace",
    
    // Minimal Effects
    subtleShadow: true,
    cleanStyle: true
};

module.exports = whiteTheme;