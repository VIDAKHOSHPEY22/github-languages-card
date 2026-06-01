// themes/golden.js
const goldenTheme = {
    name: 'golden',
    
    width: 500,
    height: 220,
    
    // Core Colors - Rich Gold & Shimmer Palette
    bgMain: '#fffbea',      // Soft golden cream background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#fff5d1',       // Soft golden area
    
    // Text Colors - Golden Bronze
    textPrimary: '#8b6914',  // Deep gold for main text
    textSecondary: '#d4a830', // Shimmering gold
    textMuted: '#f0d89b',     // Soft gold
    
    // Accent Colors - Brilliant Gold
    accent1: '#ffd700',       // Pure gold
    accent2: '#e6b800',       // Deep gold
    accentSoft: '#ffe066',    // Soft shimmering gold
    
    // Border & UI Elements
    border: '#fef0b5',
    pillBg: '#fffbea',
    pillBorder: '#fef0b5',
    barBg: '#fff8e1',
    
    // Gradients - Shimmering gold
    gradients: {
        bgGrad: ['#fffbea', '#fff5d1'],
        accentGrad: ['#ffd700', '#e6b800'],
        accentSoftGrad: ['#ffe066', '#ffd700']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.5,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace",
    
    // Shimmering Effects
    sparkleEffect: true,
    goldShine: true,
    metallicGlow: true
};

module.exports = goldenTheme;