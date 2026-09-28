import { Link } from "react-router-dom";
import {
  clearRecentlyViewed,
  removeRecentlyViewed,
  selectRecentlyViewedCount,
  selectRecentlyViewedExcluding,
} from "../store/recentlyViewedSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectRecentlyViewedCount);

  const visible = useAppSelector((state) =>
    selectRecentlyViewedExcluding(state, excludeId),
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <span className="recently-viewed-label">Recently viewed:</span>
      <ul className="recently-viewed-list">
        {visible.map((entry) => (
          <li key={entry.id} className="recently-viewed-item">
            <Link
              to={`/opportunities/${entry.id}`}
              className="recently-viewed-chip"
            >
              {entry.title}
            </Link>
            <button
              className="recently-viewed-remove"
              aria-label={`Remove ${entry.title} from recently viewed`}
              onClick={() => dispatch(removeRecentlyViewed(entry.id))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button
        className="recently-viewed-clear"
        onClick={() => dispatch(clearRecentlyViewed())}
      >
        Clear ({count})
      </button>
    </div>
  );
}

export default RecentlyViewedList;