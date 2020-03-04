import React from 'react';
import styles from './SearchGuide.module.scss';

const SearchGuide: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.arrow}>
        <span role="img" aria-label="look up">
          ☝️
        </span>
      </h1>
      <p className={styles.large}>Search for movies</p>
      <p className={styles.small}>use the search bar above</p>
    </div>
  );
};

export default SearchGuide;
