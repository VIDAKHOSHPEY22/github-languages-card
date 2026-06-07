// utils/themeValidator.js
function ensureArray(a, fallback) {
    return Array.isArray(a) && a.length >= 2 ? a : fallback;
}

function validateTheme(theme) {
    if (!theme || typeof theme !== 'object') theme = {};

    const defaults = {
        name: theme.name || 'custom',
        width: theme.width || 500,
        height: theme.height || 220,
        bgMain: theme.bgMain || '#ffffff',
        bgCard: theme.bgCard || '#ffffff',
        bgSoft: theme.bgSoft || '#f5f5f5',
        textPrimary: theme.textPrimary || '#111827',
        textSecondary: theme.textSecondary || '#6b7280',
        textMuted: theme.textMuted || '#9ca3af',
        accent1: theme.accent1 || '#ff2e7a',
        accent2: theme.accent2 || '#e8185d',
        accentSoft: theme.accentSoft || '#ff6b9d',
        border: theme.border || '#e5e7eb',
        pillBg: theme.pillBg || '#fff',
        pillBorder: theme.pillBorder || '#f0e0e8',
        barBg: theme.barBg || '#f0e0e8',
        gradients: {
            bgGrad: ensureArray((theme.gradients && theme.gradients.bgGrad) || theme.gradients, ['#ffffff', '#f5f5f5']),
            accentGrad: ensureArray((theme.gradients && theme.gradients.accentGrad) || theme.gradients, ['#ff2e7a', '#e8185d']),
            accentSoftGrad: ensureArray((theme.gradients && theme.gradients.accentSoftGrad) || theme.gradients, ['#ff6b9d', '#ff2e7a'])
        },
        borderRadius: (typeof theme.borderRadius === 'number') ? theme.borderRadius : 16,
        avatarGlow: theme.avatarGlow !== undefined ? theme.avatarGlow : true,
        animationSpeed: (typeof theme.animationSpeed === 'number') ? theme.animationSpeed : 0.6,
        fontFamily: theme.fontFamily || "'SF Pro Display', 'Inter', system-ui, sans-serif",
        monoFont: theme.monoFont || "'SF Mono', 'JetBrains Mono', monospace"
    };

    return Object.assign({}, defaults, theme);
}

module.exports = { validateTheme };
