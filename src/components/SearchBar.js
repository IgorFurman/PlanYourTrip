import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Input, List, ListItem, Header } from '../styles.js';
const SearchBar = ({ setPlaces, setCenter, setLastSearchedCity }) => {
  const [search, setSearch] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/place/textsearch?query=${search}`);
      if (response.data && response.data.results && response.data.results.length > 0) {
        setPlaces(response.data.results);
        const { lat, lng } = response.data.results[0].geometry.location;
        setCenter({ lat, lng });
        setLastSearchedCity(search); 
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching Google Places API:', error);
    }
  };

  return (
	<Header>
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Wyszukaj miejsce'
      />
      <button type='submit'>Wyszukaj</button>
    </form>
	</Header>
  );
};

export default SearchBar;
