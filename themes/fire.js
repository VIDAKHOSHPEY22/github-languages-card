// themes/fire.js
const fireTheme = {
    name: 'fire',
    
    width: 500,
    height: 220,
    
    // Core Colors - Intense Fire & Flame Palette
    bgMain: '#fff5f0',      // Very light orange-red background
    bgCard: '#ffffff',       // Pure white card
    bgSoft: '#ffe0d1',       // Soft flame orange area
    
    // Text Colors
    textPrimary: '#8b1a00',  // Deep fire red for main text
    textSecondary: '#e64a19', // Intense orange-red
    textMuted: '#ffab91',     // Soft flame
    
    // Accent Colors - Burning Fire
    accent1: '#ff3d00',       // Bright fire red
    accent2: '#dd2c00',       // Deep fire red
    accentSoft: '#ff6e40',    // Soft flame orange
    
    // Border & UI Elements
    border: '#ffccbc',
    pillBg: '#fff5f0',
    pillBorder: '#ffccbc',
    barBg: '#ffe0d1',
    
    // Gradients
    gradients: {
        bgGrad: ['#fff5f0', '#ffe0d1'],
        accentGrad: ['#ff3d00', '#dd2c00'],
        accentSoftGrad: ['#ff6e40', '#ff3d00']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.5,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace",
    
    // Special Animation Effect
    pulseEffect: true,
    fireAnimation: true
};

module.exports = fireTheme;