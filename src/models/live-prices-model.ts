// Response of the CryptoCompare pricemulti endpoint:
// { "BTC": { "USD": 64123.5 }, "ETH": { "USD": 3120.7 }, ... }
export type LivePricesModel = Record<string, { USD: number }>;
