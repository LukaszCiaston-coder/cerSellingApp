import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../redux/cars/carActions";
import styles from "./AddCarForm.module.css";

const AddCarForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [engineType, setEngineType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user.userId) {
        console.error("User is not logged in");
        return;
      }

      dispatch(
        addCar({
          make,
          model,
          year,
          price,
          description,
          mileage,
          engineType,
          transmission,
          fuelType,
          images,
          owner: user.userId,
        })
      );

      // Reset form after submission (if needed)
      setMake("");
      setModel("");
      setYear("");
      setPrice("");
      setDescription("");
      setMileage("");
      setEngineType("");
      setTransmission("");
      setFuelType("");
      setImages([]);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label htmlFor="make">Make:</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="make"
          placeholder="Car make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </div>

      <label htmlFor="model">Model:</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="model"
          placeholder="Car model..."
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>

      <label htmlFor="year">Year:</label>
      <div className={styles.formGroup}>
        <input
          type="number"
          id="year"
          placeholder="Car year..."
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>

      <label htmlFor="price">Price:</label>
      <div className={styles.formGroup}>
        <input
          type="number"
          id="price"
          placeholder="Your price..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        placeholder="Description of your car..."
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="mileage">Mileage:</label>
      <div className={styles.formGroup}>
        <input
          type="number"
          id="mileage"
          placeholder="Car mileage..."
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
        />
      </div>

      <label htmlFor="engineType">Engine Type:</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="engineType"
          placeholder="Engine type..."
          value={engineType}
          onChange={(e) => setEngineType(e.target.value)}
          required
        />
      </div>

      <label htmlFor="transmission">Transmission:</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="transmission"
          placeholder="Transmission type..."
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          required
        />
      </div>

      <label htmlFor="fuelType">Fuel Type:</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="fuelType"
          placeholder="Fuel type..."
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          required
        />
      </div>

      <label htmlFor="images">Images:</label>
      <div className={styles.formGroup}>
        <input
          type="text"
          id="images"
          placeholder="Comma-separated image URLs..."
          value={images.join(",")}
          onChange={(e) => setImages(e.target.value.split(","))}
          required
        />
      </div>

      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCarForm;
