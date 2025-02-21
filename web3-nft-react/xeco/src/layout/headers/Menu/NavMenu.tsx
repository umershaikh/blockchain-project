import React from "react";
import { Link } from "react-router-dom";

const NavMenu: React.FC = () => {
  return (
    <div className="navbar-wrap main-menu d-none d-lg-flex align-items-center">
      <ul className="nav align-items-center me-auto">
        <li className="nav-item me-4">
          <Link to="/discover" className="nav-link text-white" style={{ fontWeight: 500 }}>
          Discover
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reserve" className="nav-link text-white" style={{ fontWeight: 500 }}>
          Reserve
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
