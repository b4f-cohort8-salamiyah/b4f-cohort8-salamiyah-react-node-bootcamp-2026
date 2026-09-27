import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  clearRecentlyViewed,
  removeRecentlyViewed,
  selectRecentlyViewedCount,
  selectRecentlyViewedExcluding,
} from "../store/recentlyViewedSlice";

interface RecentlyViewedListProps {
  excludeId?: number;
}

export default function RecentlyViewedList({
  excludeId,
}: RecentlyViewedListProps) {
  const dispatch = useDispatch();

  const entries = useSelector((state: RootState) =>
    selectRecentlyViewedExcluding(state, excludeId),
  );

  const count = useSelector(selectRecentlyViewedCount);

  if (entries.length === 0) {
    return null;
  }

  function handleClear() {
    dispatch(clearRecentlyViewed());
  }

  function handleRemove(e: React.MouseEvent, id: number) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeRecentlyViewed(id));
  }

  return (
    <div className="recently-viewed">
      <div className="recently-viewed-header">
        <span className="recently-viewed-title">Recently Viewed</span>
        <button
          className="recently-viewed-clear"
          onClick={handleClear}
          type="button"
        >
          Clear ({count})
        </button>
      </div>
      <div className="recently-viewed-chips">
        {entries.map((entry) => (
          <div key={entry.id} className="recently-viewed-chip-wrapper">
            <Link
              to={`/opportunities/${entry.id}`}
              className="recently-viewed-chip"
            >
              <span className="chip-title">{entry.title}</span>
              <button
                type="button"
                className="chip-remove-button"
                aria-label={`Remove ${entry.title} from recently viewed`}
                onClick={(e) => handleRemove(e, entry.id)}
              >
                ×
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
