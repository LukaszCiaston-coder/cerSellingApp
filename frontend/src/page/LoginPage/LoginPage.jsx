import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import backgroundImage from "../../components/Images/car1.png";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = ({ onLogin, backgroundImg }) => {
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    console.log("User data after login:", userData);

    if (
      userData &&
      userData.user &&
      userData.user.email &&
      userData.user.userId &&
      userData.user.name
    ) {
      const { email, userId, name } = userData.user;
      onLogin({ email, userId, name });
      navigate(`/`); // Zaktualizowano ścieżkę przekierowania
    } else {
      console.error("Invalid userData:", userData);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftContainer}>
        <LoginForm onSubmit={handleLogin} />
      </div>
      <div
        className={styles.rightContainer}
        style={{ backgroundImage: `url(${backgroundImg || backgroundImage})` }}
      ></div>
    </div>
  );
};

export default LoginPage;
