import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";




interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedState {
  entries: RecentlyViewedEntry[];
}
export const RECENTLY_VIEWED_ENTRIES_KEY = "recentlyViewedEntries";


function loadRecentlyViewed(): RecentlyViewedEntry[] {
  const viewed = localStorage.getItem(RECENTLY_VIEWED_ENTRIES_KEY);
  if (!viewed) {
    return [];
  }
  try {
    return JSON.parse(viewed);
  } catch {
    return [];
  }
}
const MAX_RECENTLY_VIEWED = 5;
export const RECENTLY_VIEWED_ENTRIES_KEY = "recentlyViewedEntries";

function loadRecentlyViewed(): RecentlyViewedEntry[] {
  const saved = localStorage.getItem(RECENTLY_VIEWED_ENTRIES_KEY);
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

const initialState: RecentlyViewedState = {
  entries: loadRecentlyViewed(),
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
    removeRecentlyViewed(state, action: PayloadAction<number>) {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload,
      );
    },
    clearRecentlyViewed(state) {
      state.entries = [];
    },
  },
});

export function selectRecentlyViewed(state: RootState) {
  return state.recentlyViewed.entries;
}
export function selectRecentlyViewedExcluding(
  state: RootState,
  excludeId?: number,
) {
  return state.recentlyViewed.entries.filter((entry) => entry.id !== excludeId);
}
export function selectRecentlyViewedCount(state: RootState) {
  return state.recentlyViewed.entries.length;
}

export const { recordView, removeRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
export type { RecentlyViewedEntry };
