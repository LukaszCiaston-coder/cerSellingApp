import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/cars/search?query=${query}`
      );
      onSearch(response.data.cars);
    } catch (error) {
      console.error("Error searching cars:", error);
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
