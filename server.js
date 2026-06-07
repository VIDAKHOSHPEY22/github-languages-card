require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const { fetchGitHubUserData, calculateTopLanguages } = require('./utils/github');
const { buildSVG } = require('./utils/svgBuilder');
const { escapeXml } = require('./utils/helpers');
const logger = require('./utils/logger');

const pinkTheme = require('./themes/pink');
const darkTheme = require('./themes/dark');
const mintTheme = require('./themes/mint');
const purpleTheme = require('./themes/purple');
const oceanTheme = require('./themes/ocean');
const sunsetTheme = require('./themes/sunset');
const graphiteTheme = require('./themes/graphite');
const coffeeTheme = require('./themes/coffee');
const lavenderTheme = require('./themes/lavender');
const peachTheme = require('./themes/peach');
const neonTheme = require('./themes/neon');
const strawberryTheme = require('./themes/strawberry');
const darkNeonTheme = require('./themes/darkNeon');
const fireTheme = require('./themes/fire');
const snowTheme = require('./themes/snow');
const hackerTheme = require('./themes/hacker');
const whiteTheme = require('./themes/white');
const goldenTheme = require('./themes/golden');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('trust proxy', true);

const themes = {
    pink: pinkTheme, dark: darkTheme, mint: mintTheme, purple: purpleTheme,
    ocean: oceanTheme, sunset: sunsetTheme, graphite: graphiteTheme,
    coffee: coffeeTheme, lavender: lavenderTheme, peach: peachTheme,
    neon: neonTheme, strawberry: strawberryTheme, darkNeon: darkNeonTheme,
    fire: fireTheme, snow: snowTheme, hacker: hackerTheme,
    white: whiteTheme, golden: goldenTheme
};

function errorSVG(message, themeName) {
    const theme = themes[themeName] || themes.pink;
    const width = 480;
    const height = 160;
    
    const errorMessages = {
        'RATE_LIMIT': 'GitHub API rate limit reached. Please try again in a few minutes.',
        'USER_NOT_FOUND': 'GitHub user not found. Please check the username and try again.',
        'API_ERROR': 'GitHub API service error. Please try again later.',
        'TIMEOUT': 'Request timeout. Please check your internet connection.',
        'NETWORK_ERROR': 'Network error. Please check your connection and try again.'
    };
    
    let displayMessage = errorMessages[message] || message;
    
    if (displayMessage.length > 70) {
        displayMessage = displayMessage.substring(0, 67) + '...';
    }
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '">\n' +
        '  <defs>\n' +
        '    <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" stop-color="' + theme.accent1 + '"/>\n' +
        '      <stop offset="100%" stop-color="' + theme.accent2 + '"/>\n' +
        '    </linearGradient>\n' +
        '    <linearGradient id="errorBg" x1="0%" y1="0%" x2="0%" y2="100%">\n' +
        '      <stop offset="0%" stop-color="' + theme.bgCard + '"/>\n' +
        '      <stop offset="100%" stop-color="' + theme.bgSoft + '"/>\n' +
        '    </linearGradient>\n' +
        '    <filter id="errorShadow" x="-5%" y="-5%" width="115%" height="115%">\n' +
        '      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.06"/>\n' +
        '    </filter>\n' +
        '  </defs>\n' +
        '  <rect width="' + width + '" height="' + height + '" rx="12" fill="url(#errorBg)" filter="url(#errorShadow)"/>\n' +
        '  <rect x="0" y="0" width="' + width + '" height="3" rx="1.5" fill="url(#errorGradient)"/>\n' +
        '  <rect x="1" y="1" width="' + (width-2) + '" height="' + (height-2) + '" rx="11" fill="none" stroke="' + theme.accent1 + '" stroke-width="0.5" opacity="0.2"/>\n' +
        '  <circle cx="40" cy="75" r="20" fill="' + theme.accent1 + '" opacity="0.1"/>\n' +
        '  <text x="40" y="81" fill="' + theme.accent1 + '" font-size="20" text-anchor="middle" font-family="\'SF Mono\', monospace" font-weight="700">!</text>\n' +
        '  <text x="80" y="64" fill="' + theme.textPrimary + '" font-size="13" font-family="\'SF Pro Display\', system-ui" font-weight="600">Error</text>\n' +
        '  <text x="80" y="84" fill="' + theme.textSecondary + '" font-size="10" font-family="\'SF Mono\', monospace">' + escapeXml(displayMessage) + '</text>\n' +
        '  <text x="80" y="104" fill="' + theme.textMuted + '" font-size="9" font-family="\'SF Mono\', monospace">Try again or check GitHub profile</text>\n' +
        '  <text x="' + (width-20) + '" y="' + (height-12) + '" fill="' + theme.textMuted + '" font-size="8" text-anchor="end" font-family="\'SF Mono\', monospace">GitHub Languages Card</text>\n' +
        '</svg>';
}

// EMPTY REPOSITORIES CARD - زمانی که کاربر هیچ ریپازیتوری ندارد
function emptyReposSVG(username, themeName) {
    const theme = themes[themeName] || themes.pink;
    const width = 500;
    const height = 180;
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '">\n' +
        '  <defs>\n' +
        '    <linearGradient id="emptyGradient" x1="0%" y1="0%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" stop-color="' + theme.accent1 + '"/>\n' +
        '      <stop offset="100%" stop-color="' + theme.accent2 + '"/>\n' +
        '    </linearGradient>\n' +
        '    <linearGradient id="emptyBg" x1="0%" y1="0%" x2="0%" y2="100%">\n' +
        '      <stop offset="0%" stop-color="' + theme.bgCard + '"/>\n' +
        '      <stop offset="100%" stop-color="' + theme.bgSoft + '"/>\n' +
        '    </linearGradient>\n' +
        '    <filter id="emptyShadow" x="-5%" y="-5%" width="115%" height="115%">\n' +
        '      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.06"/>\n' +
        '    </filter>\n' +
        '  </defs>\n' +
        '  <rect width="' + width + '" height="' + height + '" rx="12" fill="url(#emptyBg)" filter="url(#emptyShadow)"/>\n' +
        '  <rect x="0" y="0" width="' + width + '" height="3" rx="1.5" fill="url(#emptyGradient)"/>\n' +
        '  <text x="' + (width/2) + '" y="55" fill="' + theme.textPrimary + '" font-size="22" text-anchor="middle" font-family="system-ui" font-weight="bold">📦 Oops! No Repositories Found</text>\n' +
        '  <text x="' + (width/2) + '" y="85" fill="' + theme.textSecondary + '" font-size="13" text-anchor="middle" font-family="system-ui">@' + escapeXml(username) + ' has no public repositories yet</text>\n' +
        '  <text x="' + (width/2) + '" y="110" fill="' + theme.accent1 + '" font-size="12" text-anchor="middle" font-family="\'SF Mono\', monospace">Create your first repository → https://github.com/new</text>\n' +
        '  <text x="' + (width/2) + '" y="135" fill="' + theme.textMuted + '" font-size="10" text-anchor="middle" font-family="system-ui">After pushing code, your language card will appear here 🤗</text>\n' +
        '  <text x="' + (width-20) + '" y="' + (height-12) + '" fill="' + theme.textMuted + '" font-size="8" text-anchor="end" font-family="\'SF Mono\', monospace">GitHub Languages Card</text>\n' +
        '</svg>';
}

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/api/top-languages', async (req, res) => {
    let username = req.query.username;
    let theme = req.query.theme || 'pink';
    
    const selectedTheme = themes[theme] ? theme : 'pink';
    const themeConfig = themes[selectedTheme];
    
    if (!username) {
        return res.status(400)
            .setHeader('Content-Type', 'image/svg+xml')
            .send(errorSVG('missing username parameter', selectedTheme));
    }
    
    const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!usernameRegex.test(username)) {
        return res.status(400)
            .setHeader('Content-Type', 'image/svg+xml')
            .send(errorSVG('invalid username format', selectedTheme));
    }
    
    try {
        const { user, repos, avatarBase64 } = await fetchGitHubUserData(username);
        
        console.log(`[DEBUG] User: ${username}, Total repos: ${repos.length}, Public non-fork: ${repos.filter(r => !r.fork).length}`);
        
        // CHECK FOR NO REPOSITORIES AT ALL
        if (!repos || repos.length === 0) {
            console.log(`[DEBUG] User ${username} has ZERO repositories - showing empty repos card`);
            return res.status(404)
                .setHeader('Content-Type', 'image/svg+xml')
                .setHeader('Cache-Control', 'no-cache')
                .send(emptyReposSVG(username, selectedTheme));
        }
        
        const publicNonForkRepos = repos.filter(r => !r.fork);
        
        // CHECK FOR ONLY FORKED REPOSITORIES
        if (publicNonForkRepos.length === 0) {
            console.log(`[DEBUG] User ${username} has only forked repositories - showing helpful message`);
            const helpMessage = `📦 @${username} has only forked repositories. Create your own repository to see your language stats!`;
            return res.status(404)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG(helpMessage, selectedTheme));
        }
        
        const languages = await calculateTopLanguages(repos, { excludeForks: true, limit: 5 });
        
        console.log(`[DEBUG] Languages calculated: ${languages.length}`);
        
        // CHECK FOR REPOSITORIES WITH NO DETECTABLE LANGUAGES
        if (languages.length === 0) {
            console.log(`[DEBUG] User ${username} has repos but no detectable languages`);
            const helpMessage = `💻 @${username} has ${publicNonForkRepos.length} repo(s) but no detectable programming languages. Push some code (Python, JavaScript, Java, etc.) to GitHub!`;
            return res.status(404)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG(helpMessage, selectedTheme));
        }
        
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
        const publicRepos = publicNonForkRepos.length;
        const followers = user.followers || 0;

        const svg = buildSVG(themeConfig, {
            username: username,
            user: user,
            languages: languages,
            avatarBase64: avatarBase64,
            stats: {
                repos: publicRepos,
                stars: totalStars,
                forks: totalForks,
                followers: followers
            }
        });
        
        return res.status(200)
            .setHeader('Content-Type', 'image/svg+xml')
            .setHeader('Cache-Control', 'public, max-age=3600')
            .setHeader('X-Theme', selectedTheme)
            .send(svg);
        
    } catch (error) {
        logger.error('API Error:', error.message);
        console.log(`[DEBUG] Error caught: ${error.message}`);
        
        if (error.message === 'USER_NOT_FOUND') {
            return res.status(404)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG('USER_NOT_FOUND', selectedTheme));
        } else if (error.message === 'RATE_LIMIT') {
            return res.status(429)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG('RATE_LIMIT', selectedTheme));
        } else if (error.message === 'TIMEOUT') {
            return res.status(504)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG('TIMEOUT', selectedTheme));
        } else if (error.message === 'NETWORK_ERROR') {
            return res.status(500)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG('NETWORK_ERROR', selectedTheme));
        } else {
            return res.status(500)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG('API_ERROR', selectedTheme));
        }
    }
});

app.get('/api/docs', (req, res) => {
    res.json({
        name: 'GitHub Languages Card API',
        version: '3.0.0',
        description: 'Generate beautiful SVG cards showing GitHub top programming languages',
        endpoints: {
            'GET /api/top-languages': {
                description: 'Generate language card SVG',
                parameters: {
                    username: 'GitHub username (required)',
                    theme: 'Theme name (optional, default: pink)'
                },
                example: '/api/top-languages?username=VIDAKHOSHPEY22&theme=pink',
                themes: Object.keys(themes)
            },
            'GET /health': 'Health check endpoint',
            'GET /api/docs': 'This documentation'
        },
        baseUrl: process.env.RENDER_EXTERNAL_URL || 'http://localhost:' + PORT
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: 'Please visit / for documentation or /api/docs for API reference',
        availableEndpoints: ['/', '/api/top-languages', '/api/docs', '/health']
    });
});

app.use((err, req, res, next) => {
    logger.error('Global error:', err.message || err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

const server = app.listen(PORT, '0.0.0.0', function() {
    const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    
    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                   GITHUB LANGUAGES CARD v3.0                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Server Status:     RUNNING                                          ║
║  Local URL:         http://localhost:${PORT}                          ║
║  Public URL:        ${baseUrl}                                       ║
║  API Endpoint:      /api/top-languages?username=USER&theme=THEME    ║
║                                                                      ║
║  Example:                                                            ║
║     ${baseUrl}/api/top-languages?username=VIDAKHOSHPEY22&theme=pink  ║
║                                                                      ║
║  Created by:        VIDAKHOSHPEY22                                   ║
║  GitHub:            https://github.com/VIDAKHOSHPEY22                ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
    `);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

module.exports = app;