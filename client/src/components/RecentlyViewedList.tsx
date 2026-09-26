import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const { recentlyViewed, clearAll } = useRecentlyViewed();
  const visibleEntries = recentlyViewed.filter((entry) => entry.id !== excludeId);

  if (visibleEntries.length === 0) return null;

  return (
    <section className="recently-viewed" aria-label="Recently viewed">
      <div className="recently-viewed-header">
        <h2 className="recently-viewed-title">Recently viewed</h2>
        <button type="button" className="recently-viewed-clear" onClick={clearAll}>
          Clear
        </button>
      </div>
      <ul className="recently-viewed-list">
        {visibleEntries.map((entry) => (
          <li key={entry.id}>
            <Link className="recently-viewed-link" to={`/opportunities/${entry.id}`}>
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentlyViewedList;
