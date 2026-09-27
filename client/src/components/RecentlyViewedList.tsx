import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRecentlyViewed,
  selectRecentlyViewedExcluding,
  selectRecentlyViewedCount,
  removeRecentlyViewed,
} from "../store/recentlyViewedSlice";
import { RootState } from "../store/store";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
const dispatch = useDispatch();
const count = useSelector((state: RootState) =>
  selectRecentlyViewedCount(state),
);

const visible = useSelector((state: RootState) =>
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
          <li key={entry.id}>
            <Link
              to={`/opportunities/${entry.id}`}
              className="recently-viewed-chip">
              {entry.title}
            </Link>
            <button
              type="button"
              onClick={() => dispatch(removeRecentlyViewed(entry.id))}
              aria-label={`Remove ${entry.title} from recently viewed`}>
              x
            </button>
          </li>
        ))}
      </ul>
      <button
        className="recently-viewed-clear"
        onClick={() => dispatch(clearRecentlyViewed())}>
        Clear {count}
      </button>
    </div>
  );
}

export default RecentlyViewedList;
