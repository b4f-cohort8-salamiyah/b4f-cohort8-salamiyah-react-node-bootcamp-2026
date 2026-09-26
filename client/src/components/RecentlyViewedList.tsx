import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

interface RecentlyViewedListProps {
  excludeId?: number;
}

function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const { entries, clearAll } = useRecentlyViewed();

  const visibleEntries =
    excludeId === undefined
      ? entries
      : entries.filter((entry) => entry.id !== excludeId);

  if (visibleEntries.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed">
      <div className="recently-viewed-header">
        <h2 className="recently-viewed-title">Recently viewed</h2>

        <button
          type="button"
          className="recently-viewed-clear"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>

      <div className="recently-viewed-list">
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
    </section>
  );
}

export default RecentlyViewedList;
