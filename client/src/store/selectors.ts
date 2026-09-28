import type { RootState } from "./store";
import { selectSavedCount, selectSavedIds } from "./savedOpportunitiesSlice";
import { selectRecentlyViewed, selectRecentlyViewedCount } from "./recentlyViewedSlice";

export function selectTotalActivityCount(state: RootState) {
  return selectSavedCount(state) + selectRecentlyViewedCount(state);
}

export function selectHasAnyActivity(state: RootState) {
  return selectTotalActivityCount(state) > 0;
}

export function selectRecentlyViewedNotSaved(state: RootState) {
  const savedIds = selectSavedIds(state);
  const recentlyViewed = selectRecentlyViewed(state);

  return recentlyViewed.filter((entry) => !savedIds.includes(entry.id));
}
