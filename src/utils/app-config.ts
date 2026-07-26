class AppConfig {
	public readonly allCoinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    public readonly coinDetailsUrl = "https://api.coingecko.com/api/v3/coins/"
    public readonly livePricesUrl = "https://min-api.cryptocompare.com/data/pricemulti?tsyms=USD&fsyms="

    // CryptoCompare requires a (free) API key — set it in the .env file.
    public readonly cryptoCompareApiKey = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY ?? ""
}

export const appConfig = new AppConfig();
