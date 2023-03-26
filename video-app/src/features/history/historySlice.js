import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    historyBucket: [],
  },
  reducers: {
    addHistory: (state, action) => {
      state.historyBucket.unshift(action.payload);
    },
    deleteHistoryCard: (state, action) => {
      const { cardId } = action.payload;
      state.historyBucket = state.historyBucket.filter(
        (card) => card.id !== cardId
      );
    },
    clearHistory: (state) => {
      state.historyBucket = [];
    },
  },
});

export const { clearHistory, addHistory, deleteHistoryCard } =
  historySlice.actions;

export default historySlice.reducer;
