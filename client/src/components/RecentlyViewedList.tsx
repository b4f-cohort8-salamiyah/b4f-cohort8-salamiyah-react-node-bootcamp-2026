import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

interface RecentlyViewedListProps {
  id?: number; 
}


function RecentlyViewedList({ id }: RecentlyViewedListProps) {

  
  const { recentlyViewed, clearAll } = useRecentlyViewed();

    const list = id
  ? recentlyViewed.filter((opp) => opp.id !== id)
  : recentlyViewed;

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <h2>Recently viewed</h2>
      <ul>
        {list.map((v) => (
          <li key={v.id}>
            <Link to={`/opportunities/${v.id}`}>{v.title}</Link>
          </li>
        ))}
      </ul>
      <button onClick={clearAll} className="clear-button">Clear</button>
    </div>
  );
}

export default RecentlyViewedList;