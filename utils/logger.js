// utils/logger.js
const isProd = process.env.NODE_ENV === 'production';

function format(level, args) {
    const prefix = `[${new Date().toISOString()}] [${level}]`;
    return [prefix].concat(args);
}

module.exports = {
    info: (...args) => {
        if (!isProd) console.log.apply(console, format('INFO', args));
    },
    warn: (...args) => {
        console.warn.apply(console, format('WARN', args));
    },
    error: (...args) => {
        console.error.apply(console, format('ERROR', args));
    }
};
