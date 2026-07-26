import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./app-state";
import { coinSlice } from "./coin-slice";
import { selectedCoinsSlice, selectedCoinsStorageKey } from "./selected-coins-slice";
import { searchSlice } from "./search-slice";

export const store = configureStore<AppState>({
    reducer: {
        coins: coinSlice.reducer,
        selectedCoins: selectedCoinsSlice.reducer,
        search: searchSlice.reducer,
    }
})

// Persist the selection whenever it changes (reducers return a new
// array reference only on an actual change, so this stays cheap).
let previousSelectedCoins = store.getState().selectedCoins;
store.subscribe(() => {
    const selectedCoins = store.getState().selectedCoins;
    if (selectedCoins !== previousSelectedCoins) {
        previousSelectedCoins = selectedCoins;
        localStorage.setItem(selectedCoinsStorageKey, JSON.stringify(selectedCoins));
    }
});