import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeRecentlyViewed,
  selectRecentlyViewedCount,
  selectRecentlyViewedExcluding,
} from "../store/recentlyViewesSlice";
import { clearAllViewed } from "../store/recentlyViewesSlice";
import { RootState } from "../store/store";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) =>
    selectRecentlyViewedExcluding(state, excludeId),
  );
  const count = useSelector((state: RootState) =>
    selectRecentlyViewedCount(state),
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
              className="recently-viewed-chip"
            >
              {entry.title}
              <button
                className="recently-viewed-remove"
                onClick={() => dispatch(removeRecentlyViewed(entry.id))}
              >
                x
              </button>
            </Link>
          </li>
        ))}
      </ul>
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
