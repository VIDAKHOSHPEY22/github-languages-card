// utils/svgBuilder.js
const { buildLanguageBars, buildStatsPills, buildUserSection, buildHeader, buildAvatar, buildDecorations } = require('../themes/base');
const { validateTheme } = require('./themeValidator');
const logger = require('./logger');

function buildSVG(theme, data) {
    // Fixed dimensions - no calc() needed
    // Validate and normalize theme
    theme = validateTheme(theme || {});

    var width = theme.width;
    var height = theme.height;
    
    // Get gradients with fallback
    var gradients = theme.gradients || {
        bgGrad: ['#fff5f8', '#ffeef4'],
        accentGrad: ['#ff2e7a', '#e8185d'],
        accentSoftGrad: ['#ff6b9d', '#ff2e7a']
    };
    
    var username = data.username;
    var user = data.user || {};
    var languages = data.languages || [];
    var stats = data.stats || {};
    var avatarBase64 = data.avatarBase64 || null;
    
    try {
        var languagesHtml = buildLanguageBars(languages, theme);
    } catch (e) {
        logger.error('buildLanguageBars failed', e.message);
        var languagesHtml = '';
    }
    var statsHtml = buildStatsPills(stats, theme);
    var userHtml = buildUserSection({ username: username, name: user.name, bio: user.bio }, theme);
    var avatarHtml = buildAvatar(avatarBase64, theme);
    var headerHtml = buildHeader(theme);
    var decorationsHtml = buildDecorations(theme, height);
    
    // Fixed calculations (no calc() in SVG)
    var borderWidth = width - 3;
    var borderHeight = height - 3;
    var lineEndX = width - 20;
    var footerX = width - 16;
    var footerY = height - 12;
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="xMidYMid meet">\n' +
        '  <defs>\n' +
        '    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">\n' +
        '      <stop offset="0%" style="stop-color:' + gradients.bgGrad[0] + '"/>\n' +
        '      <stop offset="100%" style="stop-color:' + gradients.bgGrad[1] + '"/>\n' +
        '    </linearGradient>\n' +
        '    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" style="stop-color:' + gradients.accentGrad[0] + '"/>\n' +
        '      <stop offset="100%" style="stop-color:' + gradients.accentGrad[1] + '"/>\n' +
        '    </linearGradient>\n' +
        '    <linearGradient id="accentSoftGrad" x1="0%" y1="0%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" style="stop-color:' + gradients.accentSoftGrad[0] + '"/>\n' +
        '      <stop offset="100%" style="stop-color:' + gradients.accentSoftGrad[1] + '"/>\n' +
        '    </linearGradient>\n' +
        '    <filter id="softShadow" x="-5%" y="-5%" width="115%" height="115%">\n' +
        '      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#000000" flood-opacity="0.08"/>\n' +
        '    </filter>\n' +
        '    <filter id="avatarGlow" x="-20%" y="-20%" width="140%" height="140%">\n' +
        '      <feGaussianBlur stdDeviation="3" result="blur"/>\n' +
        '      <feMerge>\n' +
        '        <feMergeNode in="blur"/>\n' +
        '        <feMergeNode in="SourceGraphic"/>\n' +
        '      </feMerge>\n' +
        '    </filter>\n' +
        '    <clipPath id="avatarClip">\n' +
        '      <circle cx="42" cy="45" r="20"/>\n' +
        '    </clipPath>\n' +
        '  </defs>\n' +
        '  \n' +
        '  <!-- Background - fills entire SVG -->\n' +
        '  <rect x="0" y="0" width="' + width + '" height="' + height + '" rx="16" fill="url(#bgGrad)" filter="url(#softShadow)"/>\n' +
        '  \n' +
        '  <!-- Border accent - using calculated fixed values -->\n' +
        '  <rect x="1.5" y="1.5" width="' + borderWidth + '" height="' + borderHeight + '" rx="14.5" fill="none" stroke="url(#accentGrad)" stroke-width="0.8" opacity="0.25"/>\n' +
        '  \n' +
        headerHtml + '\n' +
        avatarHtml + '\n' +
        userHtml + '\n' +
        statsHtml + '\n' +
        '  \n' +
        '  <!-- Divider line -->\n' +
        '  <line x1="20" y1="108" x2="' + lineEndX + '" y2="108" stroke="' + (theme.border || '#ffd9e8') + '" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.5">\n' +
        '    <animate attributeName="opacity" from="0" to="0.5" dur="0.5s" fill="freeze"/>\n' +
        '  </line>\n' +
        '  \n' +
        '  <!-- Languages header -->\n' +
        '  <text x="20" y="108" fill="' + (theme.accent1 || '#ff2e7a') + '" font-size="8" font-family="\'SF Mono\', monospace" font-weight="700" letter-spacing="1.2" opacity="0.8">\n' +
        '    TOP LANGUAGES\n' +
        '  </text>\n' +
        '  \n' +
        languagesHtml + '\n' +
        '  \n' +
        '  <!-- Footer -->\n' +
        '  <text x="' + footerX + '" y="' + footerY + '" fill="' + (theme.textMuted || '#d4bdc9') + '" font-size="7" font-family="\'SF Mono\', monospace" text-anchor="end" opacity="0.6">\n' +
        '    ' + (theme.name || 'pink') + ' · github languages card\n' +
        '  </text>\n' +
        '  \n' +
        decorationsHtml + '\n' +
        '</svg>';
}

module.exports.buildSVG = buildSVG;