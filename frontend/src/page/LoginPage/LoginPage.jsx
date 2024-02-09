// LoginPage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import backgroundImage from "../../components/Images/car1.png";
import styles from "./LoginPage.module.css";
import { isUserLogged } from "../../redux/users/userSelectors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isUserLogged);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Logged in successfully!");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Login successful!", { position: "bottom-right" });
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftContainer}>
        <LoginForm />
      </div>
      <div className={styles.loginAnimation}></div>
      <div
        className={styles.rightContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default LoginPage;
