import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

interface RecentlyViewedListProps {
  excludeId?: number;
}
function RecentlyViewedList({ excludeId }: RecentlyViewedListProps) {
  const { recentlyViewed, clearAll } = useRecentlyViewed();
  if (recentlyViewed.length === 0) {
    return null;
  }
  return (
    <div>
      <h3>Recently viewed</h3>
      <button onClick={clearAll}>Clear</button>

      {recentlyViewed
        .filter((entry) => entry.id !== excludeId)
        .map((entry) => (
          <Link key={entry.id} to={`/opportunities/${entry.id}`}>
            {entry.title}
          </Link>
        ))}
    </div>
  );
}
export default RecentlyViewedList;