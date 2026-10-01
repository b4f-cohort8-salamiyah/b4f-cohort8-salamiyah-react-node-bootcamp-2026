import { NavLink } from "react-router-dom";
import { selectSavedCount } from "../store/savedOpportunitiesSlice";
import { useAppSelector } from "../store/hooks";
import { fetchApiHealth } from "../api";
import { useEffect, useState } from "react";
import { apiHealth } from "../types";

function Navbar() {
  const savedCount = useAppSelector(selectSavedCount);
  const [apiHealth, setApiHealth] = useState<apiHealth>();

  function navLinkClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "nav-link nav-link-active" : "nav-link";
  }

  // async function loadStatus() {
  //   try {
  //     const status = await fetchApiHealth();
  //     setApiHealth(status);
  //   } finally {
  //     console.log("Api Health");
  //   }
  // }

  useEffect(() => {
    async function loadStatus() {
      try {
        const status = await fetchApiHealth();
        setApiHealth(status);
      } finally {
        console.log("Api Health");
      }
    }
    loadStatus();
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
