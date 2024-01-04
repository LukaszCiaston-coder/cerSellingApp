// SearchPage.jsx
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Advertisement from "../../components/Advertisement/Advertisement";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className={styles.searchPage}>
      <h2>Search Page</h2>
      <SearchBar onSearch={handleSearch} />

      <div className={styles.searchResults}>
        {searchResults.map((result) => (
          <Advertisement key={result._id} advertisement={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
