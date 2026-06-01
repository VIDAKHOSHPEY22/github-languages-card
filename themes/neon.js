// themes/neon.js
const neonTheme = {
    name: 'neon',
    
    width: 500,
    height: 220,
    
    // Core Colors - Electric Neon Palette
    bgMain: '#f0fbfc',      // Very light cyan background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#e0f7fa',       // Soft cyan area
    
    // Text Colors
    textPrimary: '#006064',  // Deep cyan for main text
    textSecondary: '#26c6da', // Bright cyan
    textMuted: '#80deea',     // Soft cyan
    
    // Accent Colors - Electric Neon
    accent1: '#00e5ff',       // Bright electric cyan
    accent2: '#00b8d4',       // Deep neon blue
    accentSoft: '#84ffff',    // Soft neon glow
    
    // Border & UI Elements
    border: '#b2ebf2',
    pillBg: '#e0f7fa',
    pillBorder: '#b2ebf2',
    barBg: '#e0f7fa',
    
    // Gradients - Electric glow
    gradients: {
        bgGrad: ['#f0fbfc', '#e0f7fa'],
        accentGrad: ['#00e5ff', '#00b8d4'],
        accentSoftGrad: ['#84ffff', '#00e5ff']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = neonTheme;