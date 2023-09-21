import React, { useState } from 'react';
import '../styles/search.css';
import { useDataContext } from '../context/DataContext';
import constants from '../constants';

const Search = () => {
  const { onSearch } = useDataContext();
  const [query, setQuery] = useState('');

  const onSearchChange = (e) => {
    if (!e) {
      return;
    }

    e.stopPropagation();
    setQuery(e.target.value);
    if (e.target.value === '') {
      // this is not user submitted,
      // resets the list items back to show all data
      onSearch(query, false);
    }
  };

  const handleSearch = () => {
    // do not search if the query is empty
    if (query.trim().toLowerCase() === '') {
      return;
    }
    onSearch(query);
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder='type a movie name ...'
        value={query}
        onChange={onSearchChange}
        maxLength={constants.user.INPUT_LENGTH}
        className='search-field'
      />
      <button onClick={handleSearch} disabled={query.trim() === ''} className='search-btn'>
        <img src={'./search.png'} alt='search' className='search-icon' />
      </button>
    </div>
  );
};

export default Search;
