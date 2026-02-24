export interface TickerItem {
    symbol: string;
    price: string;
    change: string;
    isUp: boolean;
}

export interface GeminiTickerResponse {
    pair: string;
    price: string;
    percentChange24h: string;
}

export interface WhaleAlert {
    id: string;
    asset: string;
    amount: string;
    type: "buy" | "sell";
    time: string;
}
