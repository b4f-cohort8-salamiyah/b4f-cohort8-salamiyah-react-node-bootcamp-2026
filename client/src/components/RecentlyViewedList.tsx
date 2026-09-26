import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

interface RecentlyViewedListProps {
  excludeId?: number;
}

export default function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const { recentlyViewed, clearAll } = useRecentlyViewed();

  // Filter out the excluded ID if provided (CHALLENGE)
  const itemsToDisplay = excludeId
    ? recentlyViewed.filter((item) => item.id !== excludeId)
    : recentlyViewed;

  // Render nothing when there are no items to show (CORE)
  if (itemsToDisplay.length === 0) {
    return null;
  }

  return (
    <aside className="recently-viewed-strip" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Recently viewed</h3>
        <button onClick={clearAll} className="clear-button" type="button">
          Clear
        </button>
      </div>

      <ul style={{ display: "flex", gap: "0.75rem", listStyle: "none", padding: 0, flexWrap: "wrap" }}>
        {itemsToDisplay.map((item) => (
          <li key={item.id}>
            <Link to={`/opportunities/${item.id}`} className="recently-viewed-link">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}