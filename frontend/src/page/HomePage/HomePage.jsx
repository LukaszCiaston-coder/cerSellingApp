import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Advertisement from "../../components/Advertisement/Advertisement";
import backgroundImage from "../../components/Images/tłoHome.jpg";
import styles from "./HomePage.module.css";

Modal.setAppElement("#root");

const HomePage = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cars");
        setAdvertisements(response.data.cars.slice(0, 5));
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  const handleAdvertisementClick = (advertisement) => {
    setSelectedAdvertisement(advertisement);
    setModalIsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedAdvertisement(null);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={styles.headerText}>
            <h1>Witaj w Naszym Serwisie Sprzedaży i Zakupu Samochodów!</h1>
            <p>
              Znajdź idealne auto dla siebie lub szybko sprzedaj to, które już
              posiadasz.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.advertisement}>
        {advertisements.map((advertisement) => (
          <img
            className={styles.advertisementPhoto}
            key={advertisement._id}
            src={advertisement.photos[0].url}
            alt=""
            onClick={() => handleAdvertisementClick(advertisement)}
          />
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseDetails}
        contentLabel="Szczegóły ogłoszenia"
        className={styles.Modal}
        overlayClassName={styles.ModalOverlay}
      >
        {selectedAdvertisement && (
          <div>
            <button className={styles.modalClose} onClick={handleCloseDetails}>
              ✕
            </button>
            <Advertisement advertisement={selectedAdvertisement} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HomePage;
