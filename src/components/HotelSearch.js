import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const HotelSearch = ({ lastSearchedCity, setHotels }) => {
  const getHotels = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:5000/api/place/textsearch?query=${lastSearchedCity}+hotels`);
      if (response.data && response.data.results && response.data.results.length > 0) {
        setHotels(response.data.results);
      } else {
        console.log('No hotels found.');
      }
    } catch (error) {
      console.error('Error searching Google Places API:', error);
      console.log(error.response.data);
    }
  };

  return (
    <button onClick={getHotels}>Pokaż hotele</button>
  );
};

export default HotelSearch;
