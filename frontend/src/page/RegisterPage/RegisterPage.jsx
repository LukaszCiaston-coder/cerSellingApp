import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import backgroundImage from "../../components/Images/car1.png";
import styles from "./RegisterPage.module.css";

const RegisterPage = ({ onRegister, backgroundImg }) => {
  const navigate = useNavigate();

  const handleRegister = (userData) => {
    console.log("Response data after registration:", userData);

    if (userData && userData.email && userData.userId && userData.name) {
      const { email, userId, name } = userData;
      onRegister({ email, userId, name }); // Dodajemy name
      navigate(`/`);
    } else {
      console.error("Invalid userData:", userData);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.leftContainer}>
        <RegisterForm onRegister={handleRegister} />
      </div>
      <div
        className={styles.rightContainer}
        style={{ backgroundImage: `url(${backgroundImg || backgroundImage})` }}
      ></div>
    </div>
  );
};

export default RegisterPage;
