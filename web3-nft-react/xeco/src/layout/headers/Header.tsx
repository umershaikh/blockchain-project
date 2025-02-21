"use client"
import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import Sidebar from "./Menu/Sidebar";
import Navmenu from "./Menu/NavMenu";
import { FaUserCircle } from "react-icons/fa";
import HeaderOffcanvas from "./Menu/HeaderOffcanvas";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";

const Header = () => {
    const { sticky } = UseSticky();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [offCanvas, setOffCanvas] = useState<boolean>(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();  // Clear tokens and update state
        navigate("/login");  // Redirect to the login page
    };
    return (
        <>
            <header id="header" style={{height:"140px"}}>
                <div id="sticky-header" className={`menu-area transparent-header ${sticky ? "sticky-menu" : ""}`}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="menu-wrap">
                                    <nav className="menu-nav">
                                        <div className="logo">
                                            <Link to="/"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <Navmenu />
                                        </div>
                                        <div className="header-action">
                                            <ul className="list-wrap">
                                                {!isAuthenticated ? (
                                                    <>
                                                        <li className="header-login"><Link to="/login">Login<i className="fas fa-user"></i></Link></li>
                                                        <li className="header-login"><Link to="/register">Register</Link></li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li className="header-login"><Link to="/dashboard"><FaUserCircle style={{ fontSize:"18px",margin: "0" }} />Profile</Link></li>
                                                        <li className="header-login">
                                                            <button 
                                                                onClick={handleLogout}
                                                                style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
                                                                Logout
                                                            </button>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Sidebar style={false} isActive={isActive} setIsActive={setIsActive} />
            <HeaderOffcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
        </>
    );
}

export default Header;
