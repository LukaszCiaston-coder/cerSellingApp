// Navigation.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = ({ user, onLogout, isHomePage }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${styles.nav} ${isHomePage ? styles.homePage : ""}`}>
      <div className={styles.mobileIcon} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </div>

      <div
        className={`${styles.menuItems} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <Link to="/" onClick={toggleMobileMenu}>
          Home
        </Link>
        <Link to="/search" onClick={toggleMobileMenu}>
          Search
        </Link>
        {user ? (
          <>
            <Link to="/add" onClick={toggleMobileMenu}>
              Add Your Car
            </Link>
            <Link to="/profile" onClick={toggleMobileMenu}>
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" onClick={toggleMobileMenu}>
              Register
            </Link>
            <Link to="/login" onClick={toggleMobileMenu}>
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
