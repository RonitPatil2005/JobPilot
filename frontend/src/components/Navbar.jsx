import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo-container">
        <img src={logo} alt="JobPilot Logo" />

        <div className="brand-text">
          <h2>JobPilot</h2>
        </div>
      </div>

      {/* NAV LINKS */}

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>

        <li>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
        </li>

        {/* MOBILE LOGIN / LOGOUT */}
        <li className="mobile-auth">
          {!token ? (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="login-btn">Login</button>
            </Link>

          ) : (

            <button className="logout-btn" onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            >
              Logout
            </button>

          )}

        </li>

      </ul>

      {/* DESKTOP BUTTON */}

      <div className="nav-buttons">

        {!token ? (

          <Link to="/login">

            <button className="login-btn">
              Login
            </button>

          </Link>

        ) : (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        )}

      </div>

      {/* HAMBURGER */}

      <div
        className="menu-icon"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        {menuOpen
          ? <FaTimes />
          : <FaBars />}

      </div>

    </nav>

  );
}

export default Navbar;