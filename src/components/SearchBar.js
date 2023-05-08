import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setPlaces, setCenter }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&type=tourist_attraction&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setPlaces(response.data.results);
        const { lat, lng } = response.data.results[0].geometry.location;
        setCenter({ lat, lng });
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching Google Places API:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Wyszukaj miejsce'
      />
      <button type='submit'>Wyszukaj</button>
    </form>
  );
};

export default SearchBar;
