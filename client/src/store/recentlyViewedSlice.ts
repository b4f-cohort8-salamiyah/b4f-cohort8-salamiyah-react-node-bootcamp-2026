import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface RecentlyViewedEntry {
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
      const filtered = state.entries.filter((e) => e.id !== entry.id);
      state.entries = [entry, ...filtered].slice(0, 5);
    },
    removeRecentlyViewed(state, action: PayloadAction<number>) {
      const idToRemove = action.payload;
      state.entries = state.entries.filter((e) => e.id !== idToRemove);
    },
    clearRecentlyViewed(state) {
      state.entries = [];
    },
  },
});

export const { recordView, removeRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions;

export function selectRecentlyViewed(state: RootState): RecentlyViewedEntry[] {
  return state.recentlyViewed.entries;
}

export function selectRecentlyViewedExcluding(
  state: RootState,
  excludeId?: number,
): RecentlyViewedEntry[] {
  if (excludeId === undefined) {
    return state.recentlyViewed.entries;
  }
  return state.recentlyViewed.entries.filter((entry) => entry.id !== excludeId);
}

export function selectRecentlyViewedCount(state: RootState): number {
  return state.recentlyViewed.entries.length;
}

export default recentlyViewedSlice.reducer;
