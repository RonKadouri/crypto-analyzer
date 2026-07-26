import axios from "axios";
import { CoinModel } from "../models/coin-model";
import { CoinDetailsModel } from "../models/coin-details-model";
import { LivePricesModel } from "../models/live-prices-model";
import { appConfig } from "../utils/app-config";
import { store } from "../redux/store";
import { coinSlice } from "../redux/coin-slice";

class CoinService {


    public async getAllCoins(): Promise<CoinModel[]> {
        if (store.getState().coins.length > 0) {
            return (store.getState().coins);
        }
        const response = await axios.get<CoinModel[]>(appConfig.allCoinsUrl);
        const coins = response.data;
        const action = coinSlice.actions.initCoins(coins);
        store.dispatch(action);
        return coins;
    }

    public async getCoinDetails(id: string): Promise<CoinDetailsModel> {
        const response = await axios.get<CoinDetailsModel>(appConfig.coinDetailsUrl + id);
        return response.data;
    }

    // One request returns the USD price of all given symbols at once.
    public async getLivePrices(symbols: string[]): Promise<LivePricesModel> {
        let url = appConfig.livePricesUrl + symbols.join(",");
        if (appConfig.cryptoCompareApiKey) url += "&api_key=" + appConfig.cryptoCompareApiKey;
        const response = await axios.get<LivePricesModel>(url);
        // On failure the endpoint returns 200 with an Err object instead of prices.
        if ("Err" in response.data || "Response" in response.data) {
            throw new Error("CryptoCompare error: " + JSON.stringify(response.data));
        }
        return response.data;
    }
}

export const coinService = new CoinService();
