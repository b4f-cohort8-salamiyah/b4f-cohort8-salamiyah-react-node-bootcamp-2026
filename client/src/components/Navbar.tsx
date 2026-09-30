import { NavLink } from "react-router-dom";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";
import { useAppSelector } from "../store/hooks";
import { useState, useEffect } from "react";
import { fetchApiHealth } from "../api";
import type { ApiHealth } from "../api";

function Navbar() {
  const savedCount = useAppSelector(selectSavedCount);

  const [health, setHealth] = useState<ApiHealth | null>(null);

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await fetchApiHealth();
        setHealth(data);
      } catch {}
    }

    loadHealth();
  }, []);

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

      {health !== null && (
        <p>
          API: {health.opportunities} opportunities · {health.posts} posts
        </p>
      )}

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
