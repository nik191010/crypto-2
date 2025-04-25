import React, { useContext, useState, useRef, useCallback } from 'react';
import AppContext from '../../config/context';
import debounce from 'lodash.debounce';
import { SlMagnifier } from 'react-icons/sl';
import { RxCross1 } from 'react-icons/rx';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const { setSearch } = useContext(AppContext)!;

  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null); // Typing the ref as HTMLInputElement

  // Prevents default behaviour (page reloading)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Clears the value and search and keeps focus on the input
  const onClickClear = () => {
    setSearch('');
    setValue('');
    inputRef.current?.focus();
  };

  // Delays search results setting and displaying
  const handleChange = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 1000),
    [],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.search}>
        <SlMagnifier className={styles.icon} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search coins"
          className={styles.input}
          name="coins"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleChange(e.target.value);
          }}
        />
        <RxCross1
          onClick={onClickClear}
          className={`${styles.clearIcon} ${
            value ? styles.clearIcon_active : ''
          }`}
        />
      </div>
    </form>
  );
};

export default Search;
