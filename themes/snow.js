// themes/snow.js
const snowTheme = {
    name: 'snow',
    
    width: 500,
    height: 220,
    
    // Core Colors - Winter Snow & Ice Palette
    bgMain: '#f8faff',      // Cool ice blue background
    bgCard: '#ffffff',       // Pure white card like snow
    bgSoft: '#eef2ff',       // Soft ice blue area
    
    // Text Colors
    textPrimary: '#1e3a5f',  // Deep ice blue for main text
    textSecondary: '#7ba6c9', // Soft ice blue
    textMuted: '#c5d5e8',     // Light snow blue
    
    // Accent Colors - Frozen Ice
    accent1: '#89cff0',       // Baby blue ice
    accent2: '#5ba3d9',       // Deep ice blue
    accentSoft: '#b8e2f2',    // Soft snow glow
    
    // Border & UI Elements
    border: '#d9e6f5',
    pillBg: '#f0f4fc',
    pillBorder: '#d9e6f5',
    barBg: '#e8f0fa',
    
    // Gradients
    gradients: {
        bgGrad: ['#f8faff', '#eef2ff'],
        accentGrad: ['#89cff0', '#5ba3d9'],
        accentSoftGrad: ['#b8e2f2', '#89cff0']
    },
    
    borderRadius: 18,
    avatarGlow: false,
    animationSpeed: 0.4,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace",
    
    // Snow Effect Animation
    snowflakes: true,
    fallingEffect: true
};

module.exports = snowTheme;