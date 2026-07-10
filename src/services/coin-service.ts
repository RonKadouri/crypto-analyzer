import axios from "axios";
import { CoinModel } from "../models/coin-model";
import { appConfig } from "../utils/app-config";

class CoinService {


    public async getAllCoins(): Promise<CoinModel[]> {
        const response = await axios.get<CoinModel[]>(appConfig.allCoinsUrl);
        const coins = response.data;
        return coins;
    }
}

export const coinService = new CoinService();
