import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/AuthContext"; // or wherever your AuthContext is

const NavMenu: React.FC = () => {
  const navigate = useNavigate();
  // Suppose useAuth() returns { isAuthenticated: boolean }
  const { isAuthenticated } = useAuth();

  // A helper function for safe nav:
  const handleProtectedClick = (e: React.MouseEvent<HTMLAnchorElement>, _path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login");
    } else {
      // user is logged in, normal link flow
    }
  };

  return (
    <div className="navbar-wrap main-menu d-none d-lg-flex align-items-center">
      <ul className="nav align-items-center me-auto">
        {/* Discover Link */}
        <li className="nav-item me-4">
          <Link
            to={isAuthenticated ? "/discover" : "/login"}
            className="nav-link text-white"
            style={{ fontWeight: 500 }}
            onClick={(e) => handleProtectedClick(e, "/discover")}
          >
            Discover
          </Link>
        </li>

        {/* Reserve Link */}
        <li className="nav-item">
          <Link
            to={isAuthenticated ? "/reserve" : "/login"}
            className="nav-link text-white"
            style={{ fontWeight: 500 }}
            onClick={(e) => handleProtectedClick(e, "/reserve")}
          >
            Reserve
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
 