import { CoinModel } from "../models/coin-model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function initCoins(_currentState: CoinModel[], action: PayloadAction<CoinModel[]>): CoinModel[] {
    const coinsToInit = action.payload;
    const newState = coinsToInit;
    return newState;
    
}


export const coinSlice = createSlice({
    name: "coin-slice",
    initialState: [] as CoinModel[],
    reducers:{
        initCoins
    },
})