import { configureStore } from "@reduxjs/toolkit";
import savedOpportunitiesReducer from "./savedOpportunitiesSlice";
import recentlyViewedReducer from "./recentlyViewedSlice";

const store = configureStore({
  reducer: {
    savedOpportunities: savedOpportunitiesReducer,
    recentlyViewed: recentlyViewedReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
