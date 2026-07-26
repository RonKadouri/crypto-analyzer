import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Maximum coins a user can select at once.
export const maxSelectedCoins = 5;

export const selectedCoinsStorageKey = "selectedCoins";

function loadSelectedCoins(): string[] {
    try {
        const json = localStorage.getItem(selectedCoinsStorageKey);
        return json ? JSON.parse(json) : [];
    } catch {
        return []; // corrupt/missing data — start empty
    }
}

// Adds the coin id if it's not selected yet, otherwise removes it.
// Never grows past maxSelectedCoins.
function toggleCoin(currentState: string[], action: PayloadAction<string>): string[] {
    const id = action.payload;
    if (currentState.includes(id)) {
        return currentState.filter(coinId => coinId !== id);
    }
    if (currentState.length >= maxSelectedCoins) {
        return currentState; // already at the limit — ignore
    }
    return [...currentState, id];
}

export const selectedCoinsSlice = createSlice({
    name: "selected-coins-slice",
    initialState: loadSelectedCoins(),
    reducers: {
        toggleCoin,
    },
});
