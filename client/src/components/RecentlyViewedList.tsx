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

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const dispatch = useDispatch();

  const visible = useSelector((state: RootState) =>
    selectRecentlyViewedExcluding(state, excludeId),
  );
  const count = useSelector(selectRecentlyViewedCount);
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
              type="button"
              className="recently-viewed-remove"
              aria-label={`Remove ${entry.title} from recently viewed`}
              onClick={() => dispatch(removeRecentlyViewed(entry.id))}
            >
              <span aria-hidden="true">x</span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="recently-viewed-clear"
        onClick={() => dispatch(clearRecentlyViewed())}
      >
        Clear ({count})
      </button>
    </div>
  );
}

export default RecentlyViewedList;
