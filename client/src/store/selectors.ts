import type {RootState} from "./store";
import {selectSavedCount, selectSavedIds} from "./savedOpportunitiesSlice";
import {
  selectRecentlyViewedCount,
  selectRecentlyViewed,
} from "./recentlyViewedSlice";

export function selectTotalActivityCount(state: RootState) {
  return selectSavedCount(state) + selectRecentlyViewedCount(state);
}

export function selectHasAnyActivity(state: RootState) {
  return selectTotalActivityCount(state) > 0;
}

export function selectRecentlyViewedNotSaved(state: RootState) {
  const savedIds = selectSavedIds(state);
  return selectRecentlyViewed(state).filter(
    (entry) => !savedIds.includes(entry.id),
  );
}