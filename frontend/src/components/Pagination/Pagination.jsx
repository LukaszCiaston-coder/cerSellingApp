// Pagination.jsx
import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ adsPerPage, totalAds, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAds / adsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? styles.active : ""}
          >
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
