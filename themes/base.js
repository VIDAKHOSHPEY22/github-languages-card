// themes/base.js
const { escapeXml, formatNumber, truncate } = require('../utils/helpers');

var languageColors = {
    'JavaScript': '#f7df1e',
    'Python': '#3776ab',
    'TypeScript': '#3178c6',
    'Java': '#b07219',
    'Go': '#00add8',
    'Rust': '#dea584',
    'Ruby': '#cc342d',
    'PHP': '#777bb4',
    'Swift': '#ffac45',
    'Kotlin': '#7f52ff',
    'C++': '#f34b7d',
    'C#': '#178600',
    'HTML': '#e44d26',
    'CSS': '#264de4',
    'Shell': '#4eaa25',
    'Dockerfile': '#0db7ed',
    'default': '#8b949e'
};

function buildLanguageBars(languages, theme) {
    if (!languages || languages.length === 0) return '';
    
    var bars = '';
    // Optimized spacing for 5 languages in 220px height
    var startY = 118;           // Starting Y position after "TOP LANGUAGES" header
    var barWidth = 260;         // Width of the bar
    var barHeight = 6;          // Height of the bar
    var rowHeight = 20;         // Space between each language row (perfect for 5 rows)
    var circleRadius = 4;       // Size of color dot
    
    for (var i = 0; i < languages.length; i++) {
        var lang = languages[i];
        var color = languageColors[lang.name] || languageColors.default;
        var barFillWidth = barWidth * (lang.percentage / 100);
        var delay = i * 0.1;
        var yPos = startY + (i * rowHeight);
        
        bars += '    <g>\n' +
        '      <circle cx="20" cy="' + (yPos + 4) + '" r="' + circleRadius + '" fill="' + color + '"/>\n' +
        '      <text x="34" y="' + (yPos + 8) + '" fill="' + (theme.textPrimary || '#3a2a35') + '" font-size="10" font-family="\'SF Mono\', \'JetBrains Mono\', monospace" font-weight="500">' + escapeXml(lang.name) + '</text>\n' +
        '      <text x="295" y="' + (yPos + 8) + '" fill="' + (theme.textSecondary || '#b895a8') + '" font-size="9" font-family="\'SF Mono\', monospace" text-anchor="end">' + lang.percentage.toFixed(0) + '%</text>\n' +
        '      <rect x="20" y="' + (yPos + 12) + '" width="' + barWidth + '" height="' + barHeight + '" rx="3" fill="' + (theme.barBg || '#f0e0e8') + '"/>\n' +
        '      <rect x="20" y="' + (yPos + 12) + '" width="0" height="' + barHeight + '" rx="3" fill="' + color + '">\n' +
        '        <animate attributeName="width" from="0" to="' + barFillWidth + '" dur="0.6s" begin="' + delay + 's" fill="freeze"/>\n' +
        '      </rect>\n' +
        '    </g>\n';
    }
    
    return bars;
}

function buildStatsPills(stats, theme) {
    if (!stats) return '';
    
    var repos = stats.repos || 0;
    var stars = stats.stars || 0;
    var forks = stats.forks || 0;
    var followers = stats.followers || 0;
    
    return '  <g transform="translate(82, 80)">\n' +
    '    <rect x="0" y="0" width="52" height="22" rx="11" fill="' + (theme.pillBg || '#fff0f5') + '" stroke="' + (theme.pillBorder || '#ffd9e8') + '" stroke-width="0.8"/>\n' +
    '    <text x="26" y="14" fill="' + (theme.accent1 || '#ff2e7a') + '" font-size="10" text-anchor="middle" font-family="\'SF Mono\', monospace" font-weight="700">' + repos + '</text>\n' +
    '    <text x="26" y="20" fill="' + (theme.textSecondary || '#b895a8') + '" font-size="6" text-anchor="middle" letter-spacing="0.5">REPOS</text>\n' +
    '    <rect x="58" y="0" width="52" height="22" rx="11" fill="' + (theme.pillBg || '#fff0f5') + '" stroke="' + (theme.pillBorder || '#ffd9e8') + '" stroke-width="0.8"/>\n' +
    '    <text x="84" y="14" fill="' + (theme.accent1 || '#ff2e7a') + '" font-size="10" text-anchor="middle" font-family="\'SF Mono\', monospace" font-weight="700">' + formatNumber(stars) + '</text>\n' +
    '    <text x="84" y="20" fill="' + (theme.textSecondary || '#b895a8') + '" font-size="6" text-anchor="middle" letter-spacing="0.5">STARS</text>\n' +
    '    <rect x="116" y="0" width="52" height="22" rx="11" fill="' + (theme.pillBg || '#fff0f5') + '" stroke="' + (theme.pillBorder || '#ffd9e8') + '" stroke-width="0.8"/>\n' +
    '    <text x="142" y="14" fill="' + (theme.accent1 || '#ff2e7a') + '" font-size="10" text-anchor="middle" font-family="\'SF Mono\', monospace" font-weight="700">' + formatNumber(forks) + '</text>\n' +
    '    <text x="142" y="20" fill="' + (theme.textSecondary || '#b895a8') + '" font-size="6" text-anchor="middle" letter-spacing="0.5">FORKS</text>\n' +
    '    <rect x="174" y="0" width="52" height="22" rx="11" fill="' + (theme.pillBg || '#fff0f5') + '" stroke="' + (theme.pillBorder || '#ffd9e8') + '" stroke-width="0.8"/>\n' +
    '    <text x="200" y="14" fill="' + (theme.accent1 || '#ff2e7a') + '" font-size="10" text-anchor="middle" font-family="\'SF Mono\', monospace" font-weight="700">' + formatNumber(followers) + '</text>\n' +
    '    <text x="200" y="20" fill="' + (theme.textSecondary || '#b895a8') + '" font-size="6" text-anchor="middle" letter-spacing="0.5">FOLLOWERS</text>\n' +
    '  </g>\n';
}

function buildUserSection(user, theme) {
    if (!user) return '';
    
    var displayName = escapeXml(user.name || user.username);
    var bio = user.bio ? truncate(escapeXml(user.bio), 35) : '';
    
    return '  <g>\n' +
    '    <text x="82" y="38" fill="' + (theme.textPrimary || '#3a2a35') + '" font-size="12" font-family="\'SF Pro Display\', \'Inter\', system-ui" font-weight="700" letter-spacing="-0.2">\n' +
    '      ' + truncate(displayName, 16) + '\n' +
    '    </text>\n' +
    '    <text x="82" y="52" fill="' + (theme.textSecondary || '#b895a8') + '" font-size="9" font-family="\'SF Mono\', monospace">\n' +
    '      @' + escapeXml(user.username) + '\n' +
    '    </text>\n' +
    (bio ? '    <text x="82" y="65" fill="' + (theme.textMuted || '#d4bdc9') + '" font-size="8" font-family="\'SF Pro Text\', system-ui" opacity="0.8">' + bio + '</text>\n' : '') +
    '  </g>\n';
}

// FIXED: Use fixed width instead of 100%
function buildHeader(theme) {
    return '  <rect x="0" y="0" width="500" height="3" rx="1.5" fill="url(#accentGrad)">\n' +
    '    <animate attributeName="opacity" from="0" to="1" dur="0.4s" fill="freeze"/>\n' +
    '  </rect>\n';
}

function buildAvatar(avatarBase64, theme) {
    if (avatarBase64 && avatarBase64 !== '' && avatarBase64 !== 'null' && avatarBase64.length > 100) {
        return '  <g>\n' +
        '    <circle cx="42" cy="45" r="24" fill="url(#accentGrad)" opacity="0.15" filter="url(#avatarGlow)">\n' +
        '      <animate attributeName="r" values="24;27;24" dur="3s" repeatCount="indefinite"/>\n' +
        '    </circle>\n' +
        '    <circle cx="42" cy="45" r="20" fill="' + (theme.bgCard || '#ffffff') + '" stroke="url(#accentSoftGrad)" stroke-width="2"/>\n' +
        '    <image href="' + avatarBase64 + '" x="22" y="25" width="40" height="40" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>\n' +
        '  </g>\n';
    }
    
    return '  <g>\n' +
    '    <circle cx="42" cy="45" r="24" fill="url(#accentGrad)" opacity="0.15" filter="url(#avatarGlow)">\n' +
    '      <animate attributeName="r" values="24;27;24" dur="3s" repeatCount="indefinite"/>\n' +
    '    </circle>\n' +
    '    <circle cx="42" cy="45" r="20" fill="' + (theme.accent1 || '#ff2e7a') + '" stroke="url(#accentSoftGrad)" stroke-width="2"/>\n' +
    '    <text x="42" y="52" fill="white" font-size="16" text-anchor="middle" font-family="\'SF Pro Display\', sans-serif" font-weight="600">GH</text>\n' +
    '  </g>\n';
}

function buildDecorations(theme, height) {
    return '  <g opacity="0.3">\n' +
    '    <circle cx="15" cy="' + (height - 12) + '" r="2" fill="' + (theme.accent1 || '#ff2e7a') + '"/>\n' +
    '    <circle cx="27" cy="' + (height - 7) + '" r="1.5" fill="' + (theme.accentSoft || '#ff6b9d') + '"/>\n' +
    '    <circle cx="37" cy="' + (height - 14) + '" r="1" fill="' + (theme.accent2 || '#e8185d') + '"/>\n' +
    '  </g>\n';
}

module.exports = {
    buildLanguageBars: buildLanguageBars,
    buildStatsPills: buildStatsPills,
    buildUserSection: buildUserSection,
    buildHeader: buildHeader,
    buildAvatar: buildAvatar,
    buildDecorations: buildDecorations
};