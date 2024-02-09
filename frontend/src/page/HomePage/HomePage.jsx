import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../redux/cars/carActions"; // Dostosuj ścieżkę do rzeczywistej struktury projektu
import Modal from "react-modal";
import Advertisement from "../../components/Advertisement/Advertisement";
import backgroundImage from "../../components/Images/tłoHome.jpg";
import styles from "./HomePage.module.css";

Modal.setAppElement("#root");

const generateImageUrl = (imageName) => {
  // Dodaj pełną ścieżkę do obrazów w zależności od konfiguracji serwera
  return `http://localhost:3000/uploads/${imageName}`;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const advertisements = useSelector((state) => state.cars.cars.slice(0, 5));
  const [selectedAdvertisement, setSelectedAdvertisement] =
    React.useState(null);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

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
            src={generateImageUrl(advertisement.images[0])}
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
