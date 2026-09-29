import { Link } from "react-router-dom";
import {
  removeRecentlyViewed,
  selectRecentlyViewedCount,
  selectRecentlyViewedExcluding,
} from "../store/recentlyViewesSlice";
import { clearAllViewed } from "../store/recentlyViewesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectRecentlyViewedNotSaved } from "../store/selectors";
import { toggleSaved } from "../store/savedOpportunitiesSlice";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) =>
    selectRecentlyViewedExcluding(state, excludeId),
  );
  const count = useAppSelector((state) => selectRecentlyViewedCount(state));

  const notSaved = useAppSelector(selectRecentlyViewedNotSaved);

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <span className="recently-viewed-label">Recently viewed:</span>
      <ul className="recently-viewed-list">
        {visible.map((entry) => (
          <li className="recently-viewed-item" key={entry.id}>
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
      {notSaved.length > 0 && (
        <div>
          <p className="recently-viewed-not-saved">
            {notSaved.length} of these aren't saved yet.
          </p>
          <button
            className="recently-viewed-save-all"
            onClick={() =>
              notSaved.forEach((entry) => dispatch(toggleSaved(entry.id)))
            }
          >
            Save All
          </button>
        </div>
      )}
      <button
        className="recently-viewed-clear"
        onClick={() => dispatch(clearAllViewed())}
      >
        Clear {count}
      </button>
    </div>
  );
}

export default RecentlyViewedList;
