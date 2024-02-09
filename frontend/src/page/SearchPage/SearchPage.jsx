import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Advertisement from "../../components/Advertisement/Advertisement";
import Modal from "react-modal";
import styles from "./SearchPage.module.css";
import CarList from "../../components/CarList/CarList";
import Notiflix from "notiflix";
import { generateImageUrl } from "../../utils/utils";

Modal.setAppElement("#root");

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);

    if (results.length === 0) {
      Notiflix.Notify.failure("No results found.");
    } else {
      console.log(
        `Found ${results.length} results. Displaying info notification.`
      );
      Notiflix.Notify.info(`Found ${results.length} results`);
    }
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

      {searchResults.length === 0 && searchResults !== undefined ? (
        <CarList />
      ) : (
        <div className={styles.searchResults}>
          {searchResults.map((result) => (
            <img
              className={styles.advertisementPhoto}
              key={result._id}
              src={
                (result.images &&
                  result.images.length > 0 &&
                  generateImageUrl(result.images[0])) ||
                ""
              }
              alt=""
              onClick={() => handleAdvertisementClick(result)}
            />
          ))}
        </div>
      )}

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
