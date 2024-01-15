// AddCarForm.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./AddCarForm.module.css";

const AddCarForm = ({ onSubmit }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD"); // Default currency is USD
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("make", make);
      formData.append("model", model);
      formData.append("price", price);
      formData.append("currency", currency);
      formData.append("description", description);
      formData.append("photo", photo);

      await axios.post("http://localhost:3000/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onSubmit(); // Assuming onSubmit is a callback to handle successful submission
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="make">Make:</label>
        <input
          type="text"
          id="make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Price:</label>
        <div className={styles.currencySelector}>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            {/* Add more currency options as needed */}
          </select>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className={`${styles.formGroup} ${styles.fileInputContainer}`}>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
          accept="image/*"
          className={styles.fileInput}
        />
      </div>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCarForm;
