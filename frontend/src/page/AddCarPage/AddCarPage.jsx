// AddCarPage.jsx

import React from "react";
import AddCarForm from "../../components/AddCarForm/AddCarForm";
import styles from "./AddCarPage.module.css";

const AddCarPage = () => {
  const handleAddCar = () => {
    // Obsługa dodawania samochodu, np. przekierowanie do innej strony po dodaniu
    console.log("Car added successfully!");
  };

  return (
    <div className={styles.addCarPage}>
      <h1>Add Your Car</h1>
      <AddCarForm onSubmit={handleAddCar} />
    </div>
  );
};

export default AddCarPage;
