class AppConfig {
	public readonly allCoinsUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
    public readonly coinDetailsUrl = "https://api.coingecko.com/api/v3/coins/"
    public readonly livePricesUrl = "https://min-api.cryptocompare.com/data/pricemulti?tsyms=USD&fsyms="

    public readonly chatGptUrl = "https://api.openai.com/v1/chat/completions"

    // CryptoCompare requires a (free) API key — set it in the .env file.
    public readonly cryptoCompareApiKey = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY ?? ""

    // OpenAI API key for the AI recommendations — set it in the .env file.
    public readonly openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY ?? ""
}

export const appConfig = new AppConfig();
