// Navigation.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import UserProfilePage from "../../page/UserProfilePage/UserProfilePage";

const Navigation = ({ user, onLogout, isHomePage }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfilePageOpen, setProfilePageOpen] = useState(false);

  useEffect(() => {
    if (isProfilePageOpen) {
      setMobileMenuOpen(false);
      setProfileModalOpen(false);
    }
  }, [isProfilePageOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setProfilePageOpen(false);
  };

  const toggleUserProfilePage = () => {
    setProfilePageOpen((prev) => !prev);
  };

  return (
    <nav className={`${styles.nav} ${isHomePage ? styles.homePage : ""}`}>
      <Link to="/" className={styles.logo}>
        Car<span className={styles.colorWhite}>Selling</span>
      </Link>
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
            <Link
              to="#"
              onClick={toggleUserProfilePage}
              className={styles.profileLink}
            >
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

      {isProfileModalOpen && (
        <div className={styles.profileModal}>
          <UserProfilePage user={user} onLogout={onLogout} />
        </div>
      )}

      {isProfilePageOpen && (
        <div className={styles.userProfileModal}>
          <UserProfilePage user={user} onLogout={onLogout} />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
