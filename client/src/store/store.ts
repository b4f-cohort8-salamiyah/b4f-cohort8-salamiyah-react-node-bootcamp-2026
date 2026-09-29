import { configureStore } from "@reduxjs/toolkit";
import savedOpportunitiesReducer, {
  SAVED_OPPORTUNITIES_IDS_KEY,
} from "./savedOpportunitiesSlice";
import recentlyViewedReducer, {
  RECENTLY_VIEWED_ENTRIES_KEY,
} from "./recentlyViewesSlice";

const store = configureStore({
  reducer: {
    savedOpportunities: savedOpportunitiesReducer,
    recentlyViewed: recentlyViewedReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    SAVED_OPPORTUNITIES_IDS_KEY,
    JSON.stringify(state.savedOpportunities.savedIds),
  );
  localStorage.setItem(
    RECENTLY_VIEWED_ENTRIES_KEY,
    JSON.stringify(state.recentlyViewed.entries),
  );
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
