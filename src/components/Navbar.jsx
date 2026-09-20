import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/"); // React Router navigation, no page reload
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          🛒 Cartly
        </NavLink>

        {/* Hamburger button — visible only on mobile */}
        <button
          className={`hamburger-btn ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-links ${isMenuOpen ? "mobile-open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "nav-link active cart-link" : "nav-link cart-link")}
            onClick={closeMenu}
          >
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="navbar-auth">
              <span className="navbar-username">👋 {user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <NavLink to="/login" className="nav-link" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary" onClick={closeMenu}>
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;