// W kodzie Navigation
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import UserProfilePage from "../../page/UserProfilePage/UserProfilePage";

import {
  toggleMobileMenu,
  toggleProfileModal,
} from "../../redux/navigation/navigationReducer";

const Navigation = () => {
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector(
    (state) => state.navigation.isMobileMenuOpen
  );
  const user = useSelector((state) => state.auth.user);

  // Dodaj lokalny stan do śledzenia, czy modal jest otwarty czy zamknięty
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleMobileMenuHandler = () => {
    dispatch(toggleMobileMenu());
  };

  const toggleProfileModalHandler = () => {
    setProfileModalOpen(!isProfileModalOpen);

    dispatch(toggleProfileModal());
  };

  const isProfilePageOpenValue = useSelector(
    (state) => state.navigation.isProfilePageOpen
  );

  return (
    <nav className={`${styles.nav}`}>
      <Link to="/" className={styles.logo}>
        Car<span className={styles.colorWhite}>Selling</span>
      </Link>
      <div className={styles.mobileIcon} onClick={toggleMobileMenuHandler}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </div>

      <div
        className={`${styles.menuItems} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <Link to="/" onClick={toggleMobileMenuHandler}>
          Home
        </Link>
        <Link to="/search" onClick={toggleMobileMenuHandler}>
          Search
        </Link>
        {user ? (
          <>
            <Link to="car/add" onClick={toggleMobileMenuHandler}>
              Add Your Car
            </Link>
            <Link
              to="#"
              onClick={toggleProfileModalHandler}
              className={styles.profileLink}
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" onClick={toggleMobileMenuHandler}>
              Register
            </Link>
            <Link to="/login" onClick={toggleMobileMenuHandler}>
              Login
            </Link>
          </>
        )}
      </div>

      {isProfileModalOpen && (
        <div className={styles.profileModal}>
          <UserProfilePage
            user={user}
            onLogout={() => setProfileModalOpen(false)}
          />
        </div>
      )}

      {isProfilePageOpenValue && (
        <div className={styles.userProfileModal}>
          <UserProfilePage user={user} />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
