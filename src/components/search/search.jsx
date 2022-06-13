import React from 'react';
import styles from './search.module.css';

const Search = ({ onChange }) => {
  return (
    <input
      className={styles.input}
      type="search"
      onChange={onChange}
      placeholder="Search"
    />
  );
};

export default Search;
