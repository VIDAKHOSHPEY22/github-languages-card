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

// Fetch languages for a single repo (with caching)
async function fetchRepoLanguages(owner, repoName, headers) {
    const cacheKey = `langs_${owner}/${repoName}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    const url = `https://api.github.com/repos/${owner}/${repoName}/languages`;
    try {
        const resp = await axios.get(url, { headers: headers, timeout: 30000 });
        const data = resp.data || {};
        cache.set(cacheKey, { data: data, timestamp: Date.now() });
        return data;
    } catch (err) {
        // On failure, return empty object to avoid breaking aggregation
        return {};
    }
}

// Calculate top languages by querying the languages API per repo.
// This is async because it may perform network requests.
async function calculateTopLanguages(repos, options = {}) {
    const { excludeForks = true, limit = 5, concurrency = 5 } = options;

    if (!repos || repos.length === 0) return [];

    const languageStats = {};
    let totalBytes = 0;

    // Prepare headers for language requests (reuse token if available)
    const headers = {
        'User-Agent': 'GitHub-Languages-Card',
        'Accept': 'application/vnd.github.v3+json'
    };
    if (GITHUB_TOKEN && GITHUB_TOKEN !== '') headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    // Process repos in controlled concurrency batches
    const queue = repos.filter(r => !(excludeForks && r.fork));
    for (let i = 0; i < queue.length; i += concurrency) {
        const batch = queue.slice(i, i + concurrency);
        const promises = batch.map(async (repo) => {
            const owner = (repo.owner && repo.owner.login) || repo.owner || '';
            const name = repo.name || (repo.full_name && repo.full_name.split('/').pop());
            if (!name || !owner) return;

            const langs = await fetchRepoLanguages(owner, name, headers);
            // langs is an object {Language: bytes}
            for (const [lang, bytes] of Object.entries(langs)) {
                const b = Number(bytes) || 0;
                if (b <= 0) continue;
                languageStats[lang] = (languageStats[lang] || 0) + b;
                totalBytes += b;
            }
        });

        await Promise.all(promises);
    }

    if (totalBytes === 0) return [];

    const languages = Object.entries(languageStats)
        .map(([name, bytes]) => ({ name: name, bytes: bytes, percentage: (bytes / totalBytes) * 100 }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, limit);

    return languages;
}

module.exports = { fetchGitHubUserData, calculateTopLanguages };