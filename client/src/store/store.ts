import { configureStore } from "@reduxjs/toolkit";
import savedOpportunitiesReducer, {
  SAVED_OPPORTUNITIES_IDS_KEY,
} from "./savedOpportunitiesSlice";
import recentlyViewedReducer from "./recentlyViewesSlice";

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
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
