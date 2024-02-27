require('dotenv').config();

export function getOrigin(): string[] {
    return process.env.CORS_ORIGIN?.split(',').map(c => c.trim());
}