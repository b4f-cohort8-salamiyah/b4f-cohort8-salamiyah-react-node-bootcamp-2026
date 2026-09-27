import { createSlice,  PayloadAction } from "@reduxjs/toolkit";


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

      state.entries = [
        entry,
        ...state.entries.filter((currentEntry) => currentEntry.id !== entry.id),
      ].slice(0, 5);
    },

    clearRecentlyViewed(state) {
      state.entries = [];
    },
  },
});

export const { recordView, clearRecentlyViewed } = recentlyViewedSlice.actions;

export default recentlyViewedSlice.reducer;
