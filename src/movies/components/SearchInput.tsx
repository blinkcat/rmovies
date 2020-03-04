import React, { useCallback, FormEvent } from 'react';
import classNames from 'classnames';
import styles from './SearchInput.module.scss';

export interface SearchInputProps {
  onInput: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onInput, className }) => {
  const handleInput = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      onInput((event.target as any).value);
    },
    [onInput]
  );

  return (
    <div className={classNames(styles.root, className)}>
      <label className={styles.wrapper}>
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 14.5l-3.72-3.72" />
            <circle cx="6.67" cy="6.67" r="5.33" />
          </g>
        </svg>
        <input
          onInput={handleInput}
          className={styles.input}
          type="search"
          placeholder="Search movies..."
        />
      </label>
    </div>
  );
};

export default SearchInput;
