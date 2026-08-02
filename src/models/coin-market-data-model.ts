// The parts of CoinGecko's /coins/<id>?market_data=true response needed for the AI prompt.
export type CoinMarketDataModel = {
    id: string;
    name: string;
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        total_volume: { usd: number };
        price_change_percentage_30d_in_currency: { usd: number };
        price_change_percentage_60d_in_currency: { usd: number };
        price_change_percentage_200d_in_currency: { usd: number };
    };
}
