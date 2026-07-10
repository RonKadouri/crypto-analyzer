class AppConfig {
	public readonly allCoinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    public readonly exchangeRateUrl = "https://api.frankfurter.dev/v2/rate/usd/"
}

export const appConfig = new AppConfig();
