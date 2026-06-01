// themes/graphite.js
const graphiteTheme = {
    name: 'graphite',
    
    width: 500,
    height: 220,
    
    // Core Colors - Neutral Graphite Palette
    bgMain: '#f3f4f6',      // Light gray background
    bgCard: '#ffffff',       // White card
    bgSoft: '#e5e7eb',       // Soft gray area
    
    // Text Colors
    textPrimary: '#111827',  // Dark gray for main text
    textSecondary: '#6b7280', // Muted gray
    textMuted: '#9ca3af',     // Soft gray text
    
    // Accent Colors - Cool Graphite
    accent1: '#374151',       // Dark gray
    accent2: '#1f2937',       // Darker gray
    accentSoft: '#4b5563',    // Soft gray
    
    // Border & UI Elements
    border: '#d1d5db',
    pillBg: '#e5e7eb',
    pillBorder: '#d1d5db',
    barBg: '#f0f0f0',
    
    // Gradients
    gradients: {
        bgGrad: ['#f3f4f6', '#e5e7eb'],
        accentGrad: ['#374151', '#1f2937'],
        accentSoftGrad: ['#4b5563', '#374151']
    },
    
    borderRadius: 16,
    avatarGlow: false,
    animationSpeed: 0.6,
    fontFamily: "'SF Pro Display', 'Inter', system-ui, sans-serif",
    monoFont: "'SF Mono', 'JetBrains Mono', monospace"
};

module.exports = graphiteTheme;