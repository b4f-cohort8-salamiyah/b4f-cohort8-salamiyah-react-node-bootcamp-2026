import { RootState } from "./store";
import { selectSavedCount, selectSavedIds } from "./savedOpportunitiesSlice";
import {
  selectRecentleyViewed,
  selectRecentlyViewedCount,
} from "./recentlyViewesSlice";

export function selectTotalActivityCount(state: RootState) {
  return selectRecentlyViewedCount(state) + selectSavedCount(state);
}

export function selectHasAnyActivity(state: RootState) {
  return selectTotalActivityCount(state) > 0;
}

export function selectRecentlyViewedNotSaved(state: RootState) {
  const savedIds = selectSavedIds(state);
  return selectRecentleyViewed(state).filter(
    (entry) => !savedIds.includes(entry.id),
  );
}
