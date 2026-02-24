import { NextResponse } from "next/server";

export async function GET() {
    console.log("Whale Alert Request received...");
    const apiKey = process.env.COINMARKETCAP_API;

    if (!apiKey) {
        console.error("Whale Alert Error: COINMARKETCAP_API is missing in environment variables.");
        return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    console.log("Using API Key starting with:", apiKey.substring(0, 4) + "...");

    try {
        // Fetch top 10 market movers by high 24h volume
        const response = await fetch(
            "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&sort=volume_24h&sort_dir=desc",
            {
                headers: {
                    "X-CMC_PRO_API_KEY": apiKey,
                    "Accept": "application/json"
                },
                method: "GET",
                next: { revalidate: 60 } // Cache for 1 minute
            }
        );

        console.log("CMC API Response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("CMC API Error Response:", errorText);
            try {
                const errorData = JSON.parse(errorText);
                throw new Error(errorData.status?.error_message || `HTTP ${response.status}`);
            } catch {
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
            }
        }

        const data = await response.json();

        if (!data || !data.data) {
            console.error("CMC API Error: 'data' field missing in response", data);
            throw new Error("Invalid response format from CMC");
        }

        // Transform CMC data to a simplified structure for the frontend
        const movers = data.data.map((coin: any) => ({
            id: coin.id.toString(),
            symbol: coin.symbol,
            price: coin.quote.USD.price,
            percent_change_24h: coin.quote.USD.percent_change_24h,
            volume_24h: coin.quote.USD.volume_24h,
            market_cap: coin.quote.USD.market_cap
        }));

        console.log("CMC Data successfully processed. Count:", movers.length);
        return NextResponse.json(movers);
    } catch (error: any) {
        console.error("CMC Backend Route Fatal Error:", error.message);
        // Return empty array to avoid frontend crash, but still log the 500 locally
        return NextResponse.json([], { status: 200 }); // Graceful fallback
    }
}
