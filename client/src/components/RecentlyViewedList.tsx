import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

function RecentlyViewedList() {
  const { entries } = useRecentlyViewed();

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="recently-viewed">
      <h2 className="recently-viewed-title">Recently viewed</h2>

      <div className="recently-viewed-list">
        {entries.map((entry) => (
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
