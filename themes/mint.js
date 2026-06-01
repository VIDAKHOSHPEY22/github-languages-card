// themes/mint.js
const mintTheme = {
    name: 'mint',
    
    width: 500,
    height: 220,
    
    // Core Colors - Fresh Mint Palette
    bgMain: '#f0fdf4',      // Light mint background
    bgCard: '#ffffff',       // White card
    bgSoft: '#dcfce7',       // Soft mint area
    
    // Text Colors
    textPrimary: '#14532d',  // Deep green for main text
    textSecondary: '#6b9e7a', // Muted green
    textMuted: '#a7c5b3',     // Soft mint text
    
    // Accent Colors - Vibrant Mint
    accent1: '#10b981',       // Emerald green
    accent2: '#059669',       // Darker emerald
    accentSoft: '#34d399',    // Soft emerald
    
    // Border & UI Elements
    border: '#bbf7d0',
    pillBg: '#dcfce7',
    pillBorder: '#bbf7d0',
    barBg: '#e6f7ec',
    
    // Gradients
    gradients: {
        bgGrad: ['#f0fdf4', '#dcfce7'],
        accentGrad: ['#10b981', '#059669'],
        accentSoftGrad: ['#34d399', '#10b981']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = mintTheme;