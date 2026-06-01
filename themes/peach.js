// themes/peach.js
const peachTheme = {
    name: 'peach',
    
    width: 500,
    height: 220,
    
    // Core Colors - Warm Juicy Peach Palette (NOT pink!)
    bgMain: '#fff5eb',      // Warm peach cream background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#ffe4cc',       // Soft peachy orange area
    
    // Text Colors - Warm brown-orange tones
    textPrimary: '#6b3a1f',  // Deep warm orange-brown for main text
    textSecondary: '#e0905c', // Medium peach for secondary text
    textMuted: '#f2c4a3',     // Light peachy cream for muted
    
    // Accent Colors - Juicy Orange & Peach
    accent1: '#f7a35c',       // Warm juicy peach
    accent2: '#e8813e',       // Deeper orange
    accentSoft: '#fcbe8a',    // Soft creamy peach
    
    // Border & UI Elements
    border: '#ffe0c4',
    pillBg: '#fff5eb',
    pillBorder: '#ffe0c4',
    barBg: '#ffede0',
    
    // Gradients - Warm sunset peach
    gradients: {
        bgGrad: ['#fff5eb', '#ffe4cc'],
        accentGrad: ['#f7a35c', '#e8813e'],
        accentSoftGrad: ['#fcbe8a', '#f7a35c']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = peachTheme;