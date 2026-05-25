import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage whenever route changes
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="nav-left">
        <h2>🎓 MRU Trading Platform</h2>
      </div>

      <div className="nav-center">
        <Link to="/" className="nav-btn">Dashboard</Link>
        {/* <Link to="/market-cards" className="nav-btn">Market</Link>
        <Link to="/charts" className="nav-btn">Charts</Link>
        <Link to="/myportfolio" className="nav-btn">My Portfolio</Link>
        <Link to="/sellorbuy" className="nav-btn">Trade</Link> */}
      </div>

      <div className="nav-right">

        {user ? (
          <>
            <span className="nav-username">
              👤 {user.data.userName}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              Login / Register
            </button>
          </Link>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
