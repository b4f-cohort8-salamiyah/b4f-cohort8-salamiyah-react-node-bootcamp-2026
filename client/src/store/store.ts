import { configureStore } from "@reduxjs/toolkit";
import savedOpportunitiesReducer from "./savedOpportunitiesSlice";

const store = configureStore({
  reducer: {
    savedOpportunities: savedOpportunitiesReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
