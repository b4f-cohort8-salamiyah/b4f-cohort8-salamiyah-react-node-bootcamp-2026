import { RootState } from "./store";
import { selectSavedCount } from "./savedOpportunitiesSlice";
import { selectRecentlyViewedCount } from "./recentlyViewesSlice";

export function selectTotalActivityCount(state: RootState) {
  return selectRecentlyViewedCount(state) + selectSavedCount(state);
}
