import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Notiflix from "notiflix";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/cars/search?query=${query}`
      );

      if (response.data.cars.length === 0) {
        // Show notification about no results found
        Notiflix.Notify.failure("No results found.");
      } else {
        // Call the onSearch prop with the search results
        onSearch(response.data.cars);

        // Show notification about the number of correct results
        Notiflix.Notify.info(`Found ${response.data.cars.length} results`);
      }
    } catch (error) {
      // Handle the error response
      console.error("Error searching cars:", error);
      console.error("Error response:", error.response);

      // Show specific notifications based on the status code
      if (error.response && error.response.status === 404) {
        Notiflix.Notify.failure("No results found.");
      } else {
        Notiflix.Notify.failure("Error searching cars. Please try again.");
      }
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWithIconSearch}>
        <FontAwesomeIcon icon={faSearch} className={styles.iconSearch} />
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        className={styles.buttonSearch}
        type="button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
