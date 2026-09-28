import { RootState } from "./store";
import { selectSavedCount } from "./savedOpportunitiesSlice";
import { selectRecentlyViewedCount } from "./recentlyViewesSlice";

export function selectTotalActivityCount(state: RootState) {
  return selectRecentlyViewedCount(state) + selectSavedCount(state);
}

export function selectHasAnyActivity(state: RootState) {
  return selectTotalActivityCount(state) > 0;
}
