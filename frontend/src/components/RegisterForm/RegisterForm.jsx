import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target.elements;

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        name: name.value,
        email: email.value,
        password: password.value,
      });

      const {
        name: responseName,
        email: responseEmail,
        userId,
      } = response.data.user;
      onRegister({ name: responseName, email: responseEmail, userId });
    } catch (error) {
      console.error("Error registering:", error);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className={styles.registerInputContainer}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.registerIcon} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.registerInputContainer}>
        <FontAwesomeIcon icon={faLock} className={styles.registerIcon} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
