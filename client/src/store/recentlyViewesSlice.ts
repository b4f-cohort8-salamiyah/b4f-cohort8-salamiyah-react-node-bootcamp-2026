import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RecentlyViewedEntry {
  id: number;
  title: string;
}

interface RecentlyViewedState {
  recentleyViewed: RecentlyViewedEntry[];
}

const initialState: RecentlyViewedState = {
  recentleyViewed: [],
};

const MAX_RECENTLY_VIEWED = 5;

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    recordView(state, action: PayloadAction<RecentlyViewedEntry>) {
      const entry = action.payload;
      state.recentleyViewed = state.recentleyViewed.filter(
        (item) => item.id !== entry.id,
      );
      state.recentleyViewed.unshift(entry);
      state.recentleyViewed.slice(0, MAX_RECENTLY_VIEWED);
    },
    clearAllViewed(state) {
      state.recentleyViewed = [];
    },
  },
});

export function selectRecentleyViewed(state: RootState) {
  return state.recentlyViewed.recentleyViewed;
}

export const { recordView, clearAllViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
