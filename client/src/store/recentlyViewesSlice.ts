import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const RECENTLY_VIEWED_ENTRIES_KEY = "recentlyViewedEntries";

function loadRecentlyViewed(): RecentlyViewedEntry[] {
  const saved = localStorage.getItem(RECENTLY_VIEWED_ENTRIES_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedState {
  entries: RecentlyViewedEntry[];
}

const initialState: RecentlyViewedState = {
  entries: loadRecentlyViewed(),
};

const MAX_RECENTLY_VIEWED = 5;

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    recordView(state, action: PayloadAction<RecentlyViewedEntry>) {
      const entry = action.payload;
      const withoutEntry = state.entries.filter((item) => item.id !== entry.id);
      state.entries = [entry, ...withoutEntry].slice(0, MAX_RECENTLY_VIEWED);
    },
    clearAllViewed(state) {
      state.entries = [];
    },
    removeRecentlyViewed(state, action: PayloadAction<number>) {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload,
      );
    },
  },
});

export function selectRecentleyViewed(state: RootState) {
  return state.recentlyViewed.entries;
}

export function selectRecentlyViewedExcluding(
  state: RootState,
  excludeId?: number,
) {
  return state.recentlyViewed.entries.filter((item) => item.id !== excludeId);
}

export function selectRecentlyViewedCount(state: RootState) {
  return state.recentlyViewed.entries.length;
}

export const { recordView, clearAllViewed, removeRecentlyViewed } =
  recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
export type { RecentlyViewedEntry };
