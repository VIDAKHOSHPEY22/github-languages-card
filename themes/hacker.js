// themes/hacker.js
const hackerTheme = {
    name: 'hacker',
    
    width: 500,
    height: 220,
    
    // Core Colors - Dark Matrix & Terminal Palette
    bgMain: '#0a0f0a',      // Very dark green-black
    bgCard: '#0d1a0d',      // Dark matrix card
    bgSoft: '#0f1f0f',      // Dark green area
    
    // Text Colors - Glowing Green
    textPrimary: '#00ff41',  // Classic matrix green
    textSecondary: '#00cc33', // Darker green
    textMuted: '#1a4d1a',     // Dark muted green
    
    // Accent Colors - Terminal Glow
    accent1: '#00ff41',       // Bright matrix green
    accent2: '#00cc33',       // Deep terminal green
    accentSoft: '#39ff14',    // Neon green glow
    
    // Border & UI Elements
    border: '#1a4d1a',
    pillBg: '#0d1a0d',
    pillBorder: '#1a4d1a',
    barBg: '#0f1f0f',
    
    // Gradients - Glitch effect
    gradients: {
        bgGrad: ['#0a0f0a', '#0d1a0d'],
        accentGrad: ['#00ff41', '#00cc33'],
        accentSoftGrad: ['#39ff14', '#00ff41']
    },
    
    borderRadius: 12,
    avatarGlow: true,
    animationSpeed: 0.7,
    fontFamily: "'Courier New', 'Fira Code', 'SF Mono', monospace",
    monoFont: "'Courier New', 'Fira Code', monospace",
    
    // Hacker Effects
    glitchEffect: true,
    matrixEffect: true,
    terminalStyle: true
};

module.exports = hackerTheme;