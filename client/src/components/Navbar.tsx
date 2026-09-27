import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";

function Navbar() {
  const savedCount = useSelector(selectSavedCount);

  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }

  return (
    <header className="navbar">
      <NavLink to="/" end className="navbar-brand-link" aria-label="B4F Hub home">
        <div className="navbar-brand">
          <span className="navbar-logo">B4F</span>
          <span className="navbar-title">Hub</span>
        </div>
      </NavLink>

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
          {savedCount > 0 && (
            <span className="saved-count-badge">{savedCount}</span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
