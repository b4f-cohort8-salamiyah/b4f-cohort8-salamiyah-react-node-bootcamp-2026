import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const SAVED_OPPORTUNITIES_IDS_KEY = "savedOpportunitiesIds";

function loadSavedIds(): number[] {
  const saved = localStorage.getItem(SAVED_OPPORTUNITIES_IDS_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

interface SavedOpportunitiesState {
  savedIds: number[];
}

const initialState: SavedOpportunitiesState = {
  savedIds: loadSavedIds(),
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
    clearAllSaved(state) {
      state.savedIds = [];
    },
  },
});

export function selectSavedIds(state: RootState) {
  return state.savedOpportunities.savedIds;
}

export function selectSavedCount(state: RootState) {
  return state.savedOpportunities.savedIds.length;
}

export function selectIsSaved(state: RootState, id: number) {
  return state.savedOpportunities.savedIds.includes(id);
}

export const { toggleSaved, clearAllSaved } = savedOpportunitiesSlice.actions;
export default savedOpportunitiesSlice.reducer;
