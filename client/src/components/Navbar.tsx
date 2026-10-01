import { NavLink } from "react-router-dom";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";
import { useAppSelector } from "../store/hooks";
import { fetchApiHealth, type ApiHealth } from "../api";
import { useEffect, useState } from "react";

function Navbar() {
  const [health, setHealth] = useState<ApiHealth | null>(null);

  const savedCount = useAppSelector(selectSavedCount);

  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }
  useEffect(() => {
    let cancelled = false;

    fetchApiHealth()
      .then((data) => {
        if (!cancelled) setHealth(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">B4F</span>
        <span className="navbar-title">Hub</span>
      </div>
      <div className="navbar-text">
        <p className="navbar-tagline">
          Community &amp; Opportunities for B4F trainees and alumni
        </p>
        {health && (
          <p className="navbar-health">
            API: {health.opportunities} opportunities · {health.posts} posts
          </p>
        )}
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/community" className={navLinkClassName}>
          Community
        </NavLink>
        <NavLink to="/opportunities" className={navLinkClassName}>
          Opportunities
          {savedCount > 0 && (
            <span className="saved-count-badge">{savedCount}</span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
