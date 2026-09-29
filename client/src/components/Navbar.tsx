import { NavLink } from "react-router-dom";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";
import { useAppSelector } from "../store/hooks";
import { ApiHealth } from "../types";
import { useState, useEffect } from "react";
import { fetchApiHealth } from "../api";

function Navbar() {
  const savedCount = useAppSelector(selectSavedCount);
  const [apiHealth, setApiHealth] = useState<ApiHealth | null>(null);

  async function loadApiHealth() {
    try {
      const data = await fetchApiHealth();
      setApiHealth(data);
    } catch {
      // فشل الطلب لا يجب أن يمنع Navbar من الظهور
    }
  }

  useEffect(() => {
    loadApiHealth();
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

      <div className="navbar-description">
        <p className="navbar-tagline">
          Community &amp; Opportunities for B4F trainees and alumni
        </p>

        {apiHealth && (
          <p className="navbar-api-status">
            API: {apiHealth.opportunities} opportunities · {apiHealth.posts}{" "}
            posts
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
