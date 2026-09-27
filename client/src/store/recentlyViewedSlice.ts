import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface ViewedItem {
  id: number;
  title: string;
}

interface RecentlyViewedState {
  entries: ViewedItem[];
}

const initialState: RecentlyViewedState = {
  entries: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    recordView(state, action: PayloadAction<ViewedItem>) {
      const newItem = action.payload;
      const filtered = state.entries.filter((item) => item.id !== newItem.id);
      state.entries = [newItem, ...filtered].slice(0, 5);
    },
    clearRecentlyViewed(state) {
      state.entries = [];
    },
    removeRecentlyViewed(state, action: PayloadAction<number>) {
      state.entries = state.entries.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {recordView, clearRecentlyViewed, removeRecentlyViewed} =
  recentlyViewedSlice.actions;

export function selectRecentlyViewed(state: RootState) {
  return state.recentlyViewed.entries;
}

export function selectRecentlyViewedExcluding(
  state: RootState,
  excludeId?: number,
) {
  const entries = selectRecentlyViewed(state);
  if (excludeId === undefined) return entries;
  return entries.filter((item) => item.id !== excludeId);
}

export function selectRecentlyViewedCount(state: RootState) {
  return state.recentlyViewed.entries.length;
}

export default recentlyViewedSlice.reducer;
