// Advertisement.jsx
import React, { useState } from "react";
import styles from "./Advertisement.module.css";

const Advertisement = ({ advertisement }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  return (
    <div className={styles.advertisement}>
      <div className={styles.information}>
        <h2>
          {advertisement.make} {advertisement.model}
        </h2>
        <p>Year: {advertisement.year}</p>
        <p>Price: ${advertisement.price}</p>
        <p>Description: {advertisement.description}</p>
      </div>
      <div className={styles.photos}>
        <img
          src={advertisement.photos[selectedPhotoIndex].url}
          alt=""
          className={styles.mainPhoto}
        />

        <div className={styles.thumbnails}>
          {advertisement.photos.map((photo, index) => (
            <img
              key={index}
              src={photo.url}
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
