import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Szukaj miejsca"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>szukaj</button>
    </div>
  );
};

export default SearchBar;
