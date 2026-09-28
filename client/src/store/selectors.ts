import type { RootState } from "./store";
import { selectSavedCount } from "./savedOpportunitiesSlice";
import { selectRecentlyViewedCount } from "./recentlyViewedSlice";

export function selectTotalActivityCount(state: RootState) {
  return selectSavedCount(state) + selectRecentlyViewedCount(state);
}

export function selectHasAnyActivity(state: RootState) {
  return selectTotalActivityCount(state) > 0;
}
