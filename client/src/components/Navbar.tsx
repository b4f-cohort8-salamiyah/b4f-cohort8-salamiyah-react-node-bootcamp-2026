import {NavLink} from "react-router-dom";
import {selectSavedCount} from "../store/savedOpportunitiesSlice";
import {useAppSelector} from "../store/hooks";
import {fetchHealthStatues} from "../api";
import {useEffect, useState} from "react";
import {ApiHealthStatues} from "../types";

function Navbar() {
  const [healthStatues, setHealthStatues] = useState<ApiHealthStatues>();

  async function laodHealthStatues() {
    try {
      const healthData = await fetchHealthStatues();
      setHealthStatues(healthData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    laodHealthStatues();
  }, []);

  const savedCount = useAppSelector(selectSavedCount);

  function navLinkClassName({isActive}: {isActive: boolean}) {
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

      <div className="health-stateus">
        <span>status: {healthStatues?.status} </span>
        <span>posts count: {healthStatues?.posts} </span>
        <span>opportunities count: {healthStatues?.opportunities}</span>
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
