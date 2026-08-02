import axios, { isAxiosError } from "axios";
import { CoinMarketDataModel } from "../models/coin-market-data-model";
import { RecommendationModel } from "../models/recommendation-model";
import { appConfig } from "../utils/app-config";

// The exact coin fields ChatGPT needs in order to give a sensible recommendation.
type CoinPromptData = {
    name: string;
    current_price_usd: number;
    market_cap_usd: number;
    volume_24h_usd: number;
    price_change_percentage_30d_in_currency: number;
    price_change_percentage_60d_in_currency: number;
    price_change_percentage_200d_in_currency: number;
}

type ChatGptResponse = {
    choices: { message: { content: string } }[];
}

class RecommendationsService {

    public async getRecommendation(coinId: string): Promise<RecommendationModel> {
        const marketData = await this.getCoinMarketData(coinId);
        return this.askChatGpt(this.toPromptData(marketData));
    }

    private async getCoinMarketData(coinId: string): Promise<CoinMarketDataModel> {
        const url = appConfig.coinDetailsUrl + coinId + "?market_data=true";
        const response = await axios.get<CoinMarketDataModel>(url);
        return response.data;
    }

    private toPromptData(coin: CoinMarketDataModel): CoinPromptData {
        const data = coin.market_data;
        return {
            name: coin.name,
            current_price_usd: data.current_price.usd,
            market_cap_usd: data.market_cap.usd,
            volume_24h_usd: data.total_volume.usd,
            price_change_percentage_30d_in_currency: data.price_change_percentage_30d_in_currency.usd,
            price_change_percentage_60d_in_currency: data.price_change_percentage_60d_in_currency.usd,
            price_change_percentage_200d_in_currency: data.price_change_percentage_200d_in_currency.usd,
        };
    }

    private async askChatGpt(coin: CoinPromptData): Promise<RecommendationModel> {
        if (!appConfig.openAiApiKey) {
            throw new Error("Missing OpenAI API key — set VITE_OPENAI_API_KEY in the .env file.");
        }
        const body = {
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content:
                        "You are a cryptocurrency investment advisor. " +
                        "Given the market data of a coin, decide whether it is currently worth buying. " +
                        'Answer only with a JSON object: {"shouldBuy": boolean, "explanation": string}. ' +
                        "The explanation must be a single short paragraph describing why it is " +
                        "or is not worth buying the coin.",
                },
                {
                    role: "user",
                    content: "Should I buy this coin?\n" + JSON.stringify(coin, null, 4),
                },
            ],
        };
        const headers = { Authorization: "Bearer " + appConfig.openAiApiKey };
        try {
            const response = await axios.post<ChatGptResponse>(appConfig.chatGptUrl, body, { headers });
            return JSON.parse(response.data.choices[0].message.content);
        } catch (err) {
            // OpenAI puts the useful message inside the response body.
            if (isAxiosError(err) && err.response?.data?.error?.message) {
                throw new Error("ChatGPT error: " + err.response.data.error.message, { cause: err });
            }
            throw err;
        }
    }
}

export const recommendationsService = new RecommendationsService();
