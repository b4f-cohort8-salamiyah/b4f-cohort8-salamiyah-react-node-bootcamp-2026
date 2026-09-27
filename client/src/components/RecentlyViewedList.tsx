import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRecentleyViewed } from "../store/recentlyViewesSlice";
import { clearAllViewed } from "../store/recentlyViewesSlice";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const dispatch = useDispatch();
  const recentlyViewed = useSelector(selectRecentleyViewed);
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
        className="recently-viewed-clear"
        onClick={() => dispatch(clearAllViewed())}
      >
        Clear
      </button>
    </div>
  );
}

export default RecentlyViewedList;
