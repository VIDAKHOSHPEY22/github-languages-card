// themes/purple.js
const purpleTheme = {
    name: 'purple',
    
    width: 500,
    height: 220,
    
    // Core Colors - Royal Purple Palette
    bgMain: '#faf5ff',      // Light purple background
    bgCard: '#ffffff',       // White card
    bgSoft: '#f3e8ff',       // Soft purple area
    
    // Text Colors
    textPrimary: '#3b0764',  // Deep purple for main text
    textSecondary: '#9b6bcc', // Muted purple
    textMuted: '#c4a5e0',     // Soft purple text
    
    // Accent Colors - Vibrant Purple
    accent1: '#9333ea',       // Purple
    accent2: '#7e22ce',       // Darker purple
    accentSoft: '#a855f7',    // Soft purple
    
    // Border & UI Elements
    border: '#e9d5ff',
    pillBg: '#f3e8ff',
    pillBorder: '#e9d5ff',
    barBg: '#f0e6ff',
    
    // Gradients
    gradients: {
        bgGrad: ['#faf5ff', '#f3e8ff'],
        accentGrad: ['#9333ea', '#7e22ce'],
        accentSoftGrad: ['#a855f7', '#9333ea']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = purpleTheme;