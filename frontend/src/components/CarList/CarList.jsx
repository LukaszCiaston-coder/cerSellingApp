// CarListPage.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../../redux/cars/carActions";
import Modal from "react-modal";
import Advertisement from "../../components/Advertisement/Advertisement";
import styles from "./CarList.module.css";

Modal.setAppElement("#root");
const generateImageUrl = (imageName) => {
  // Dodaj pełną ścieżkę do obrazów w zależności od konfiguracji serwera
  return `http://localhost:3000/uploads/${imageName}`;
};
const CarListPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Wywołaj akcję getAllCars przy pierwszym renderowaniu komponentu
    dispatch(getAllCars());
  }, [dispatch]);

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setModalIsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.carListPage}>
      <div className={styles.carList}>
        {cars.map((car) => (
          <img
            className={styles.carPhoto}
            key={car._id}
            src={generateImageUrl(car.images[0])}
            alt=""
            onClick={() => handleCarClick(car)}
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseDetails}
        contentLabel="Szczegóły samochodu"
        className={styles.Modal}
        overlayClassName={styles.ModalOverlay}
      >
        {selectedCar && (
          <div>
            <button className={styles.modalClose} onClick={handleCloseDetails}>
              ✕
            </button>
            <Advertisement advertisement={selectedCar} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarListPage;
