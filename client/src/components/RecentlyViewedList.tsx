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
        <h3>Recently viewed</h3>
        <button type="button" className="back-button" onClick={clearAll}>
          Clear
        </button>
      </div>
      <ul className="recently-viewed-links">
        {visibleEntries.map((entry) => (
          <li key={entry.id}>
            <Link to={`/opportunities/${entry.id}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentlyViewedList;
