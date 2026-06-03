require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const { fetchGitHubUserData, calculateTopLanguages } = require('./utils/github');
const { buildSVG } = require('./utils/svgBuilder');
const { escapeXml } = require('./utils/helpers');

// Import all themes
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

// Serve static files from 'public' directory
app.use(express.static('public'));
app.set('trust proxy', true);

// Theme registry
const themes = {
    pink: pinkTheme, dark: darkTheme, mint: mintTheme, purple: purpleTheme,
    ocean: oceanTheme, sunset: sunsetTheme, graphite: graphiteTheme,
    coffee: coffeeTheme, lavender: lavenderTheme, peach: peachTheme,
    neon: neonTheme, strawberry: strawberryTheme, darkNeon: darkNeonTheme,
    fire: fireTheme, snow: snowTheme, hacker: hackerTheme,
    white: whiteTheme, golden: goldenTheme
};

// Error SVG generator
function errorSVG(message, themeName) {
    const theme = themes[themeName] || themes.pink;
    const width = 420;
    const height = 120;
    
    const errorMessages = {
        'RATE_LIMIT': 'GitHub API rate limit reached. Please try again in a few minutes.',
        'USER_NOT_FOUND': 'GitHub user not found. Please check the username and try again.',
        'API_ERROR': 'GitHub API service error. Please try again later.',
        'TIMEOUT': 'Request timeout. Please check your internet connection.',
        'NETWORK_ERROR': 'Network error. Please check your connection and try again.'
    };
    
    const displayMessage = errorMessages[message] || message;
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 ' + width + ' ' + height + '">\n' +
        '  <defs>\n' +
        '    <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">\n' +
        '      <stop offset="0%" style="stop-color:' + theme.accent1 + '"/>\n' +
        '      <stop offset="100%" style="stop-color:' + theme.accent2 + '"/>\n' +
        '    </linearGradient>\n' +
        '    <linearGradient id="errorBg" x1="0%" y1="0%" x2="0%" y2="100%">\n' +
        '      <stop offset="0%" style="stop-color:' + theme.bgCard + '"/>\n' +
        '      <stop offset="100%" style="stop-color:' + theme.bgSoft + '"/>\n' +
        '    </linearGradient>\n' +
        '    <filter id="errorShadow" x="-5%" y="-5%" width="115%" height="115%">\n' +
        '      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.06"/>\n' +
        '    </filter>\n' +
        '  </defs>\n' +
        '  <rect width="' + width + '" height="' + height + '" rx="12" fill="url(#errorBg)" filter="url(#errorShadow)"/>\n' +
        '  <rect x="0" y="0" width="' + width + '" height="3" rx="1.5" fill="url(#errorGradient)"/>\n' +
        '  <rect x="1" y="1" width="' + (width-2) + '" height="' + (height-2) + '" rx="11" fill="none" stroke="' + theme.accent1 + '" stroke-width="0.5" opacity="0.2"/>\n' +
        '  <circle cx="40" cy="60" r="20" fill="' + theme.accent1 + '" opacity="0.1"/>\n' +
        '  <text x="40" y="66" fill="' + theme.accent1 + '" font-size="20" text-anchor="middle" font-family="\'SF Mono\', monospace" font-weight="700">!</text>\n' +
        '  <text x="80" y="54" fill="' + theme.textPrimary + '" font-size="12" font-family="\'SF Pro Display\', system-ui" font-weight="600">Error</text>\n' +
        '  <text x="80" y="72" fill="' + theme.textSecondary + '" font-size="9" font-family="\'SF Mono\', monospace">' + escapeXml(displayMessage) + '</text>\n' +
        '  <text x="' + (width-20) + '" y="' + (height-12) + '" fill="' + theme.textMuted + '" font-size="8" text-anchor="end" font-family="\'SF Mono\', monospace">GitHub Languages Card</text>\n' +
        '</svg>';
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Main API endpoint
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
        // Calculate top 5 languages using languages API per repo
        const languages = await calculateTopLanguages(repos, { excludeForks: true, limit: 5 });
        
        if (languages.length === 0) {
            return res.status(404)
                .setHeader('Content-Type', 'image/svg+xml')
                .send(errorSVG('no language data for ' + username, selectedTheme));
        }
        
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
        const publicRepos = repos.filter(function(r) { return !r.fork; }).length;
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
        
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('X-Theme', selectedTheme);
        res.send(svg);
        
    } catch (error) {
        console.error('API Error:', error.message);
        
        if (error.message === 'USER_NOT_FOUND') {
            res.status(404).setHeader('Content-Type', 'image/svg+xml').send(errorSVG('USER_NOT_FOUND', selectedTheme));
        } else if (error.message === 'RATE_LIMIT') {
            res.status(429).setHeader('Content-Type', 'image/svg+xml').send(errorSVG('RATE_LIMIT', selectedTheme));
        } else if (error.message === 'TIMEOUT') {
            res.status(504).setHeader('Content-Type', 'image/svg+xml').send(errorSVG('TIMEOUT', selectedTheme));
        } else if (error.message === 'NETWORK_ERROR') {
            res.status(500).setHeader('Content-Type', 'image/svg+xml').send(errorSVG('NETWORK_ERROR', selectedTheme));
        } else {
            res.status(500).setHeader('Content-Type', 'image/svg+xml').send(errorSVG('API_ERROR', selectedTheme));
        }
    }
});

// API documentation endpoint
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

// Main landing page - serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: 'Please visit / for documentation or /api/docs for API reference',
        availableEndpoints: ['/', '/api/top-languages', '/api/docs', '/health']
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
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