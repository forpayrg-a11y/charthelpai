import { MetadataRoute } from 'next';

// SEO Strategy: Programmatic Sitemap generation allows Google to discover thousands of dynamic pages
// without manual entry. We pull assets and terms dynamically from our "database".

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://charthelp.ai';

/**
 * Mock function to simulate fetching popular crypto/stock pairs from DB.
 * In production, replace this with a direct database query (e.g., MongoDB find).
 */
async function getPopularAssets() {
    return [
        { symbol: 'BTC-USDT', updatedAt: new Date() },
        { symbol: 'ETH-USDT', updatedAt: new Date() },
        { symbol: 'SOL-USDT', updatedAt: new Date() },
        { symbol: 'XRP-USDT', updatedAt: new Date() },
        { symbol: 'AVAX-USDT', updatedAt: new Date() },
    ];
}

/**
 * Mock function to simulate fetching glossary terms from DB.
 * Helps index educational content which drives top-of-funnel organic traffic.
 */
async function getGlossaryTerms() {
    return [
        { slug: 'relative-strength-index', updatedAt: new Date() },
        { slug: 'head-and-shoulders-pattern', updatedAt: new Date() },
        { slug: 'fibonacci-retracement', updatedAt: new Date() },
        { slug: 'moving-average-convergence-divergence', updatedAt: new Date() },
    ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const assets = await getPopularAssets();
    const terms = await getGlossaryTerms();

    // 1. Core Pages: High priority as they represent the main utility
    const staticRoutes = [
        '',
        '/market-overview',
        '/history',
        '/settings',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    // 2. Dynamic Asset Pages: Medium-High priority (Daily updates for tickers)
    const assetRoutes = assets.map((asset) => ({
        url: `${BASE_URL}/analysis/${asset.symbol}`,
        lastModified: asset.updatedAt,
        changeFrequency: 'always' as const, // Technical analysis changes with price action
        priority: 0.8,
    }));

    // 3. Glossary Terms: Evergreen content (Lower change frequency)
    const glossaryRoutes = terms.map((term) => ({
        url: `${BASE_URL}/glossary/${term.slug}`,
        lastModified: term.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...assetRoutes, ...glossaryRoutes];
}
