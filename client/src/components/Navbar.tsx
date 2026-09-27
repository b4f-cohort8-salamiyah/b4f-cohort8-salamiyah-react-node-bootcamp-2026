import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Navbar() {
  const savedIds = useSelector(
    (state: RootState) => state.savedOpportunities.savedIds,
  );

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
          {savedIds.length > 0 && (
            <span className="saved-count-badge">{savedIds.length}</span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
