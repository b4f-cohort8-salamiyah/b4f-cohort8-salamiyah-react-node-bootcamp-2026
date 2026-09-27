import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedState {
  entries: RecentlyViewedEntry[];
}

const MAX_RECENTLY_VIEWED = 5;

const initialState: RecentlyViewedState = {
  entries: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    recordView(state, action: PayloadAction<RecentlyViewedEntry>) {
      const entry = action.payload;

      const withoutEntry = state.entries.filter(
        (existing) => existing.id !== entry.id,
      );

      state.entries = [entry, ...withoutEntry].slice(0, MAX_RECENTLY_VIEWED);
    },

    clearRecentlyViewed(state) {
      state.entries = [];
    },
    removeRecentlyViewed(state, action: PayloadAction<number>) {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload,
      );
    },
  },
});

export function selectRecentlyViewed(state: RootState) {
  return state.recentlyViewed.entries;
};

export function selectRecentlyViewedExcluding(state: RootState, excludeId?: number) {
  return state.recentlyViewed.entries.filter((entry) => entry.id !== excludeId);
}
export function selectRecentlyViewedCount(state: RootState) {
  return state.recentlyViewed.entries.length;
}

export const { recordView, clearRecentlyViewed, removeRecentlyViewed } =
  recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
