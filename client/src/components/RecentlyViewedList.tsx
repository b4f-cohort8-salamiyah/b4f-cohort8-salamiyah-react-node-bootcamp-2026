import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const { recentlyViewed, clearAll } = useRecentlyViewed();

  const visibleEntries = recentlyViewed.filter(
    (entry) => entry.id !== excludeId,
  );

  if (visibleEntries.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <div className="recently-viewed-header">
        <p className="recently-viewed-title">Recently viewed</p>
        <button className="clear-button" onClick={clearAll}>
          Clear
        </button>
      </div>

      <div className="recently-viewed-links">
        {visibleEntries.map((entry) => (
          <Link
            key={entry.id}
            to={`/opportunities/${entry.id}`}
            className="recently-viewed-link"
          >
            {entry.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewedList;
