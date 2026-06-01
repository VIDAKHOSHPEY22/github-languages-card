// themes/lavender.js
const lavenderTheme = {
    name: 'lavender',
    
    width: 500,
    height: 220,
    
    // Core Colors - Distinct Soft Lavender Palette (different from purple)
    bgMain: '#f5f0ff',      // Soft lavender mist background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#ece4ff',       // Gentle lavender haze
    
    // Text Colors - Softer than purple
    textPrimary: '#4a3a6e',  // Soft violet for main text
    textSecondary: '#b8a4d9', // Light lavender for secondary text
    textMuted: '#d9cef0',     // Very light lavender for muted
    
    // Accent Colors - Unique lavender shades (not purple)
    accent1: '#b892ff',       // Bright lavender (distinct from #9333ea purple)
    accent2: '#9d6eff',       // Deeper lavender
    accentSoft: '#d4bbff',    // Soft pastel lavender
    
    // Border & UI Elements
    border: '#e8ddf8',
    pillBg: '#f5f0ff',
    pillBorder: '#e8ddf8',
    barBg: '#f0eaff',
    
    // Gradients - Unique lavender flow
    gradients: {
        bgGrad: ['#f5f0ff', '#ece4ff'],
        accentGrad: ['#b892ff', '#9d6eff'],
        accentSoftGrad: ['#d4bbff', '#b892ff']
    },
    
    borderRadius: 18,
    avatarGlow: true,
    animationSpeed: 0.5,
    fontFamily: "'SF Pro Display', 'Inter', 'Poppins', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', 'Fira Code', monospace"
};

module.exports = lavenderTheme;