// themes/ocean.js
const oceanTheme = {
    name: 'ocean',
    
    width: 500,
    height: 220,
    
    // Core Colors - Ocean Blue Palette
    bgMain: '#f0f9ff',      // Light blue background
    bgCard: '#ffffff',       // White card
    bgSoft: '#e0f2fe',       // Soft blue area
    
    // Text Colors
    textPrimary: '#0c4a6e',  // Deep blue for main text
    textSecondary: '#5ba8c9', // Muted blue
    textMuted: '#9ec2d6',     // Soft blue text
    
    // Accent Colors - Vibrant Ocean
    accent1: '#0ea5e9',       // Sky blue
    accent2: '#0284c7',       // Darker blue
    accentSoft: '#38bdf8',    // Soft blue
    
    // Border & UI Elements
    border: '#bae6fd',
    pillBg: '#e0f2fe',
    pillBorder: '#bae6fd',
    barBg: '#e6f5fc',
    
    // Gradients
    gradients: {
        bgGrad: ['#f0f9ff', '#e0f2fe'],
        accentGrad: ['#0ea5e9', '#0284c7'],
        accentSoftGrad: ['#38bdf8', '#0ea5e9']
    },
    
    borderRadius: 16,
    avatarGlow: true,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = oceanTheme;