// RegisterForm.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../redux/users/userActions";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
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
      await dispatch(signUpUser(formData));
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className={styles.registerInputContainer}>
        <FontAwesomeIcon icon={faUser} className={styles.registerIcon} />
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="username"
        />
      </div>

      <div className={styles.registerInputContainer}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.registerIcon} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <div className={styles.registerInputContainer}>
        <FontAwesomeIcon icon={faLock} className={styles.registerIcon} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
      </div>

      <button className={styles.registerButton} type="submit">
        Register
      </button>

      <Link to="/login" className={styles.toLogin}>
        Already have an account? Log In
      </Link>
    </form>
  );
};

export default RegisterForm;
