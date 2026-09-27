import { NavLink, Link } from "react-router-dom";
import { useSavedOpportunities } from "../context/SavedOpportunitiesContext";
import { useRecentViews } from "../context/RecentViewedContext";

function Navbar() {
  const { savedIds } = useSavedOpportunities();
  const { recentViews } = useRecentViews();

  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">B4F</span>
        <span className="navbar-title">Hub</span>
      </div>
      <p className="navbar-tagline">
        Community &amp; Opportunities for B4F trainees and alumni
      </p>

      <nav className="navbar-links">
        <NavLink to="/" end className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/community" className={navLinkClassName}>
          Community
        </NavLink>
        <NavLink to="/opportunities" className={navLinkClassName}>
          Opportunities
          {savedIds.size > 0 && (
            <span className="saved-count-badge">{savedIds.size}</span>
          )}
        </NavLink>
      </nav>

      {recentViews.length > 0 && (
        <div className="recent-views-panel">
          <span className="recent-views-label">Recently viewed</span>
          <div className="recent-views-list">
            {recentViews.map((opportunity) => (
              <Link
                key={opportunity.id}
                to={`/opportunities/${opportunity.id}`}
                className="recent-view-link"
              >
                {opportunity.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
