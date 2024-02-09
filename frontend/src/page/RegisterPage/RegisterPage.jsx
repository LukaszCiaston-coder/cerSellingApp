import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import backgroundImage from "../../components/Images/car1.png";
import styles from "./RegisterPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    toast.success("Registration successful! Log in."); // Add a message after successful registration
    navigate("/login");
  };

  return (
    <div className={styles.registerPage}>
      <div
        className={styles.leftContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className={styles.registerAnimation}></div>
      <div className={styles.rightContainer}>
        <RegisterForm onRegister={handleRegister} />
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default RegisterPage;
