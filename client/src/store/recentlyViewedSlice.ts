import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedState {
  entries: RecentlyViewedEntry[];
}

const initialState: RecentlyViewedState = {
  entries: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    recordView(state, action: PayloadAction<RecentlyViewedEntry>) {
      const entry = action.payload;

      const finalList = state.entries.filter(
        (existing) => existing.id !== entry.id
      );

      finalList.unshift(entry);
      state.entries = finalList.slice(0, 5);
    },

    clearRecentlyViewed(state) {
      state.entries = [];
    },

    removeRecentlyViewed(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.entries = state.entries.filter((entry) => entry.id !== id);
    },
  },
});


export function selectRecentlyViewed(state: RootState) {
  return state.recentlyViewed.entries;
}

export function selectRecentlyViewedExcluding(
  state: RootState,
  excludeId?: number
) {
  const entries = state.recentlyViewed.entries;

  if (excludeId === undefined) {
    return entries;
  }

  return entries.filter((entry) => entry.id !== excludeId);
}

export function selectRecentlyViewedCount(state: RootState) {
  return state.recentlyViewed.entries.length;
}

export const {
  recordView,
  clearRecentlyViewed,
  removeRecentlyViewed,
} = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;