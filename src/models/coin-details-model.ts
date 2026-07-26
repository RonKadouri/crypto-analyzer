export type CoinDetailsModel = {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_data: {
        current_price: { [currency: string]: number };
    };
}
