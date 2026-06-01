// themes/dark.js
const darkTheme = {
    name: 'dark',
    
    width: 500,
    height: 220,
    
    // Core Colors - Modern Dark Theme
    bgMain: '#0d1117',      // GitHub dark background
    bgCard: '#161b22',       // Card background
    bgSoft: '#1f242e',       // Soft dark area
    
    // Text Colors
    textPrimary: '#f0f6fc',  // White-blue for main text
    textSecondary: '#8b949e', // Gray for secondary text
    textMuted: '#6e7681',     // Muted gray
    
    // Accent Colors - GitHub Blue
    accent1: '#58a6ff',       // GitHub blue
    accent2: '#1f6feb',       // Darker blue
    accentSoft: '#79c0ff',    // Soft blue
    
    // Border & UI Elements
    border: '#30363d',
    pillBg: '#1f242e',
    pillBorder: '#30363d',
    barBg: '#2d333b',
    
    // Gradients
    gradients: {
        bgGrad: ['#0d1117', '#161b22'],
        accentGrad: ['#58a6ff', '#1f6feb'],
        accentSoftGrad: ['#79c0ff', '#58a6ff']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = darkTheme;