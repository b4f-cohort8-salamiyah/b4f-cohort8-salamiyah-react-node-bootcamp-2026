import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

function RecentlyViewedList() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <span className="recently-viewed-label">Recently viewed:</span>
      <ul className="recently-viewed-list">
        {recentlyViewed.map((entry) => (
          <li key={entry.id}>
            <Link
              className="recently-viewed-link"
              to={`/opportunities/${entry.id}`}
            >
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyViewedList;