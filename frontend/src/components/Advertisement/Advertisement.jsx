import React, { useState } from "react";
import styles from "./Advertisement.module.css";

const Advertisement = ({ advertisement }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const generateImageUrl = (imageName) => {
    // Tutaj dodaj pełną ścieżkę do obrazów w zależności od twojej konfiguracji serwera
    return `http://localhost:3000/uploads/${imageName}`;
  };

  return (
    <div className={styles.advertisement}>
      <div className={styles.information}>
        <h2>
          {advertisement.make} {advertisement.model}
        </h2>
        <p>Year: {advertisement.year}</p>
        <p>Price: ${advertisement.price}</p>
        <p>Mileage: {advertisement.mileage}</p>
        <p>Engine Type: {advertisement.engineType}</p>
        <p>Transmission: {advertisement.transmission}</p>
        <p>Fuel Type: {advertisement.fuelType}</p>
        <p>Description: {advertisement.description}</p>
      </div>
      <div className={styles.photos}>
        {advertisement.images && advertisement.images.length > 0 && (
          <img
            src={generateImageUrl(advertisement.images[selectedPhotoIndex])}
            alt=""
            className={styles.mainPhoto}
          />
        )}

        <div className={styles.thumbnails}>
          {advertisement.images &&
            advertisement.images.map((image, index) => (
              <img
                key={index}
                src={generateImageUrl(image)}
                alt=""
                className={
                  index === selectedPhotoIndex
                    ? styles.selectedThumbnail
                    : styles.thumbnail
                }
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
