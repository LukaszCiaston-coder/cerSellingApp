import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/users/userActions";
import styles from "./UserProfilePage.module.css";

const UserProfilePage = ({ user, onLogout }) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Wywołujemy funkcję przekazaną z rodzica, aby zamknąć modal
      onLogout();
      // Wywołujemy funkcję wylogowania
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const handleCancel = () => {
    // Zamykamy modal
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
