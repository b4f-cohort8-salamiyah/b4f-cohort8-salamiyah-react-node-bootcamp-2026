import { NavLink } from "react-router-dom";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { fetchApiHealth } from "../api";

function Navbar() {
  const [apiCondition, setapiCondition] = useState(true);
  const savedCount = useAppSelector(selectSavedCount);

  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }

  useEffect(() => {
    const checkhealth = async ()=>{
      const ok = await fetchApiHealth();
      setapiCondition(ok);
    }

    checkhealth();
  },[]);

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
        <div className="api-status">
          <div className={apiCondition?"circle green":"circle red"}></div>
          <div className="text">{apiCondition?"live":"Down"}</div>
        </div>
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
