// SearchPage.jsx
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Advertisement from "../../components/Advertisement/Advertisement";
import Modal from "react-modal";
import styles from "./SearchPage.module.css";

Modal.setAppElement("#root");

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleAdvertisementClick = (advertisement) => {
    setSelectedAdvertisement(advertisement);
    setModalIsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedAdvertisement(null);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.searchPage}>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.searchResults}>
        {searchResults.map((result) => (
          <img
            className={styles.advertisementPhoto}
            key={result._id}
            src={result.photos[0].url}
            alt=""
            onClick={() => handleAdvertisementClick(result)}
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

export default SearchPage;
