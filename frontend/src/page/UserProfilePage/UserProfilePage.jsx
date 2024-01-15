import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfilePage.module.css";

const UserProfilePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(true);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h1>User Profile</h1>
            {user && (
              <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            )}

            <p>Czy na pewno chcesz się wylogować?</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleCancel}>Anuluj</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
