// themes/darkNeon.js
const darkNeonTheme = {
    name: 'darkNeon',
    
    width: 500,
    height: 220,
    
    // Core Colors - Dark Neon Cyberpunk Palette
    bgMain: '#0a0a0a',      // Dark black background
    bgCard: '#1a1a2e',      // Dark blue-black card
    bgSoft: '#16213e',       // Deep navy area
    
    // Text Colors
    textPrimary: '#e0e0e0',  // Light gray for main text
    textSecondary: '#00e5ff', // Neon cyan
    textMuted: '#4d4d6e',     // Dark muted
    
    // Accent Colors - Glowing Neon
    accent1: '#00ff88',       // Neon green
    accent2: '#00e5ff',       // Neon cyan
    accentSoft: '#39ff14',    // Bright neon glow
    
    // Border & UI Elements
    border: '#00e5ff',
    pillBg: '#1a1a2e',
    pillBorder: '#00e5ff',
    barBg: '#16213e',
    
    // Gradients - Cyberpunk glow
    gradients: {
        bgGrad: ['#0a0a0a', '#1a1a2e'],
        accentGrad: ['#00ff88', '#00e5ff'],
        accentSoftGrad: ['#39ff14', '#00ff88']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.8,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = darkNeonTheme;