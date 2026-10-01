import { NavLink } from "react-router-dom";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { fetchApiHealth } from "../api";

function Navbar() {
  const savedCount = useAppSelector(selectSavedCount);
  const [apiSummary, setApiSummary] = useState<string | null>(null);

  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }

  useEffect(() => {
    fetchApiHealth()
      .then((health) => {
        setApiSummary(
          `API: ${health.opportunities} opportunities · ${health.posts} posts`,
        );
      })
      .catch();
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">B4F</span>
        <span className="navbar-title">Hub</span>
      </div>
      <p className="navbar-tagline">
        Community &amp; Opportunities for B4F trainees and alumni
        {apiHealth?.status == "OK" && (
          <p className="navbar-tagline">
            Api: {apiHealth?.opportunities} opportunities . {apiHealth?.posts}{" "}
            posts
          </p>
        )}
      </p>
      {apiSummary && <p className="navbar-api-summary">{apiSummary}</p>}

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
