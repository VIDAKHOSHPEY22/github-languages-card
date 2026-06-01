// themes/coffee.js
const coffeeTheme = {
    name: 'coffee',
    
    width: 500,
    height: 220,
    
    // Core Colors - Warm Coffee Palette
    bgMain: '#faf6f0',      // Cream background
    bgCard: '#ffffff',       // White card
    bgSoft: '#f5ebe0',       // Soft beige area
    
    // Text Colors
    textPrimary: '#4a3728',  // Coffee brown for main text
    textSecondary: '#a68a6b', // Muted brown
    textMuted: '#c9b69a',     // Soft beige text
    
    // Accent Colors - Rich Coffee
    accent1: '#c47b4a',       // Warm brown
    accent2: '#a05e3a',       // Darker brown
    accentSoft: '#d9926e',    // Soft brown
    
    // Border & UI Elements
    border: '#e6d5c3',
    pillBg: '#f5ebe0',
    pillBorder: '#e6d5c3',
    barBg: '#ede0d4',
    
    // Gradients
    gradients: {
        bgGrad: ['#faf6f0', '#f5ebe0'],
        accentGrad: ['#c47b4a', '#a05e3a'],
        accentSoftGrad: ['#d9926e', '#c47b4a']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = coffeeTheme;