import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Replaces the current search text with whatever the user typed.
function setSearch(_currentState: string, action: PayloadAction<string>): string {
    return action.payload;
}

export const searchSlice = createSlice({
    name: "search-slice",
    initialState: "" as string,
    reducers: {
        setSearch,
    },
});
