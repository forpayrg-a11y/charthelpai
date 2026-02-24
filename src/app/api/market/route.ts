import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.COINMARKETCAP_API;

    if (!apiKey) {
        return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    try {
        // Fetch Global Market Metrics
        const globalResponse = await fetch(
            "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
            {
                headers: {
                    "X-CMC_PRO_API_KEY": apiKey,
                    "Accept": "application/json"
                },
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        );

        // Fetch Top Cryptocurrencies
        const listingsResponse = await fetch(
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20&sort=market_cap&sort_dir=desc",
            {
                headers: {
                    "X-CMC_PRO_API_KEY": apiKey,
                    "Accept": "application/json"
                },
                next: { revalidate: 60 } // Cache for 1 minute
            }
        );

        if (!globalResponse.ok || !listingsResponse.ok) {
            throw new Error("Failed to fetch data from CMC");
        }

        const globalData = await globalResponse.json();
        const listingsData = await listingsResponse.json();

        return NextResponse.json({
            global: {
                total_market_cap: globalData.data.quote.USD.total_market_cap,
                total_volume_24h: globalData.data.quote.USD.total_volume_24h,
                btc_dominance: globalData.data.btc_dominance,
                eth_dominance: globalData.data.eth_dominance,
                market_cap_change: globalData.data.quote.USD.total_market_cap_yesterday_percentage_change
            },
            coins: listingsData.data.map((coin: any) => ({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                price: coin.quote.USD.price,
                market_cap: coin.quote.USD.market_cap,
                volume_24h: coin.quote.USD.volume_24h,
                percent_change_24h: coin.quote.USD.percent_change_24h,
                percent_change_7d: coin.quote.USD.percent_change_7d
            }))
        });
    } catch (error: any) {
        console.error("Market API Error:", error.message);
        return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
    }
}
