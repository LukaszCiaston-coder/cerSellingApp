import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      onSubmit(response.data);
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div
        className={`${styles.loginInputContainer} ${
          isEmailFocused ? styles.focused : ""
        }`}
      >
        <FontAwesomeIcon icon={faEnvelope} className={styles.loginIcon} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onFocus={handleEmailFocus}
          onBlur={handleEmailBlur}
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>
      <div
        className={`${styles.loginInputContainer} ${
          isPasswordFocused ? styles.focused : ""
        }`}
      >
        <FontAwesomeIcon icon={faLock} className={styles.loginIcon} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
      </div>
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
