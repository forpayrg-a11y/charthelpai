import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Create a new ratelimiter, that allows 5 requests per minute
export const rateLimit = redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({
            url: redisUrl,
            token: redisToken,
        }),
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        analytics: true,
        prefix: "API_RATE_LIMIT",
    })
    : {
        limit: async () => ({ success: true, remaining: 5, reset: Date.now() }),
    } as any;
