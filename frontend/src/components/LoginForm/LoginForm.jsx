// LoginForm.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/users/userActions";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(formData));
      console.log("Zalogowano użytkownika.");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {["email", "password"].map((inputName) => (
        <div key={inputName} className={styles.loginInputContainer}>
          <FontAwesomeIcon
            icon={inputName === "email" ? faEnvelope : faLock}
            className={styles.loginIcon}
          />
          <input
            type={inputName === "email" ? "email" : "password"}
            name={inputName}
            placeholder={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
            value={formData[inputName]}
            onChange={handleChange}
            required
            autoComplete={inputName === "email" ? "email" : "current-password"}
          />
        </div>
      ))}

      <button className={styles.loginButton} type="submit">
        Login
      </button>

      <Link to="/register" className={styles.toRegister}>
        Register
      </Link>
    </form>
  );
};

export default LoginForm;
