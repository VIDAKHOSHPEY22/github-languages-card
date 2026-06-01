// utils/github.js
const axios = require('axios');

// Cache to reduce API calls
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get token from environment variable
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

async function fetchGitHubUserData(username) {
    // Check cache first
    const cacheKey = `user_${username}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('[Cache] Returning cached data for:', username);
        return cached.data;
    }
    
    try {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const headers = {
            'User-Agent': 'GitHub-Languages-Card',
            'Accept': 'application/vnd.github.v3+json'
        };
        
        if (GITHUB_TOKEN && GITHUB_TOKEN !== '') {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
            console.log('[GitHub] ✅ Authenticated - 5000 requests/hour');
        } else {
            console.log('[GitHub] ⚠️ No token - Only 60 requests/hour');
            console.log('[GitHub] 💡 Get token: https://github.com/settings/tokens');
        }
        
        const [userResponse, reposResponse] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`, {
                headers: headers,
                timeout: 30000
            }),
            axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`, {
                headers: headers,
                timeout: 30000
            })
        ]);
        
        // NEW: Fetch avatar as base64 for embedding in SVG
        let avatarBase64 = null;
        let avatarContentType = 'image/png';
        
        try {
            const avatarUrl = userResponse.data.avatar_url;
            // Use s=96 for optimal size
            const cleanAvatarUrl = avatarUrl.split('?')[0] + '?s=96';
            
            console.log('[Avatar] Fetching from:', cleanAvatarUrl);
            
            const avatarResponse = await axios.get(cleanAvatarUrl, {
                responseType: 'arraybuffer',
                timeout: 30000,
                headers: {
                    'User-Agent': 'GitHub-Languages-Card'
                }
            });
            
            // Convert to base64
            const base64 = Buffer.from(avatarResponse.data, 'binary').toString('base64');
            
            // Detect content type
            if (avatarResponse.headers['content-type']) {
                avatarContentType = avatarResponse.headers['content-type'];
            }
            
            avatarBase64 = `data:${avatarContentType};base64,${base64}`;
            console.log('[Avatar] ✅ Successfully converted to base64 for:', username);
            
        } catch (avatarError) {
            console.log('[Avatar] ⚠️ Failed to fetch avatar for:', username, avatarError.message);
            // Avatar is optional, continue without it
        }
        
        const data = { 
            user: userResponse.data, 
            repos: reposResponse.data,
            avatarBase64: avatarBase64  // Add base64 avatar to response
        };
        
        // Store in cache
        cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });
        
        const remaining = userResponse.headers['x-ratelimit-remaining'];
        console.log(`[GitHub] ✅ Fetched ${username} - Rate limit remaining: ${remaining}`);
        
        return data;
        
    } catch (error) {
        console.error('[GitHub] Error:', error.message);
        
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('USER_NOT_FOUND');
            } else if (error.response.status === 403) {
                if (error.response.headers && error.response.headers['x-ratelimit-remaining'] === '0') {
                    throw new Error('RATE_LIMIT');
                } else {
                    throw new Error('API_ERROR');
                }
            } else if (error.response.status === 401) {
                throw new Error('INVALID_TOKEN');
            } else {
                throw new Error('API_ERROR');
            }
        } else if (error.code === 'ECONNABORTED') {
            throw new Error('TIMEOUT');
        } else {
            throw new Error('NETWORK_ERROR');
        }
    }
}

function calculateTopLanguages(repos, options = {}) {
    const { excludeForks = true, limit = 5 } = options;
    const languageStats = {};
    let totalBytes = 0;
    
    for (const repo of repos) {
        if (excludeForks && repo.fork) continue;
        if (!repo.language) continue;
        if (repo.size === 0) continue;
        
        const lang = repo.language;
        const size = repo.size;
        
        languageStats[lang] = (languageStats[lang] || 0) + size;
        totalBytes += size;
    }
    
    if (totalBytes === 0) return [];
    
    const languages = Object.entries(languageStats)
        .map(([name, bytes]) => ({
            name: name,
            bytes: bytes,
            percentage: (bytes / totalBytes) * 100
        }))
        .sort(function(a, b) { return b.percentage - a.percentage; })
        .slice(0, limit);
    
    return languages;
}

module.exports = { fetchGitHubUserData, calculateTopLanguages };