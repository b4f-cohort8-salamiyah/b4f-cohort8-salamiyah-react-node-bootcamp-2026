import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/ViewedContext";

interface RecentlyViewedListProps {
  currentId?: number;
}

function RecentlyViewedList({ currentId }: RecentlyViewedListProps) {
  const { recentViews, clearAll } = useRecentlyViewed();

  const visibleViews = currentId
    ? recentViews.filter((view) => view.id !== currentId)
    : recentViews;

  if (visibleViews.length === 0) {
    return null;
  }

  return (
    <div
      className="recently-viewed-list"
      style={{
        padding: "10px 15px",
        backgroundColor: "#f0f4f8",
        borderRadius: "8px",
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
          Recently viewed
        </h4>
        <button
          onClick={clearAll}
          style={{
            padding: "2px 8px",
            fontSize: "0.8rem",
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          Clear
        </button>
      </div>
      <ul
        style={{
          display: "flex",
          gap: "15px",
          listStyle: "none",
          padding: 0,
          margin: 0,
          flexWrap: "wrap",
        }}
      >
        {visibleViews.map((view) => (
          <li key={view.id}>
            <Link
              to={`/opportunities/${view.id}`}
              style={{
                textDecoration: "none",
                color: "#0066cc",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              {view.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentlyViewedList;
