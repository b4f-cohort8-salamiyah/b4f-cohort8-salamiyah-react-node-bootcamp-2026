import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../store/store";
import { clearRecentlyViewed } from "../store/recentlyViewedSlice";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const dispatch = useDispatch();

  const recentlyViewed = useSelector(
    (state: RootState) => state.recentlyViewed.entries,
  );

  const visible = recentlyViewed.filter((entry) => entry.id !== excludeId);

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
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="recently-viewed-clear"
        onClick={() => dispatch(clearRecentlyViewed())}
      >
        Clear
      </button>
    </div>
  );
}

export default RecentlyViewedList;
