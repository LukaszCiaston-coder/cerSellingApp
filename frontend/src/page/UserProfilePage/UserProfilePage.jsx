// UserProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfilePage.module.css";

const UserProfilePage = ({ user, onLogout }) => {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setLogoutModalOpen(false);
    // Dodaj dowolne inne akcje, które chcesz wykonać po wylogowaniu
    navigate("/");
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className={styles.modal}>
          <p>Czy na pewno chcesz się wylogować?</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setLogoutModalOpen(false)}>Anuluj</button>
        </div>
      )}

      <button onClick={() => setLogoutModalOpen(true)}>Logout</button>
    </div>
  );
};

export default UserProfilePage;
