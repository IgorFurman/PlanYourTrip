import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setPlaces }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
// API request here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Wyszukaj miejsce"
      />
      <button type="submit">Wyszukaj</button>
    </form>
  );
};

export default SearchBar;
