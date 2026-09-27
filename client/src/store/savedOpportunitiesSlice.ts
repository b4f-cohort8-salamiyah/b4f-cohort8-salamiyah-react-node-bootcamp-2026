import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedOpportunitiesState {
  savedIds: number[];
}

const initialState: SavedOpportunitiesState = {
  savedIds: [],
};

const savedOpportunitiesSlice = createSlice({
  name: "savedOpportunities",
  initialState,
  reducers: {
    toggleSaved(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.savedIds.includes(id)) {
        state.savedIds = state.savedIds.filter((savedId) => savedId !== id);
      } else {
        state.savedIds.push(id);
      }
    },
  },
});

export const { toggleSaved } = savedOpportunitiesSlice.actions;

export default savedOpportunitiesSlice.reducer;
