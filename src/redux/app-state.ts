import { CoinModel } from "../models/coin-model"

export type AppState = {
    coins: CoinModel[];
    selectedCoins: string[];
    search: string;
}