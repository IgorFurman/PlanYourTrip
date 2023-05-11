import React from 'react';
import axios from 'axios';
import { ButtonSearch } from '../styles.js';

const HotelSearch = ({ lastSearchedCity, setHotels, handleShowHotels }) => {
  const getHotels = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/place/hotels?query=${lastSearchedCity}`);

      if (response.data && response.data.results && response.data.results.length > 0) {
        setHotels(response.data.results);
        handleShowHotels(); 
      } else {
        console.log('No hotels found.');
      }
    } catch (error) {
      console.error('Error searching Google Places API:', error);
      console.log(error.response.data);
    }
  };

  return (
    <ButtonSearch onClick={getHotels}>Pokaż hotele</ButtonSearch>
  );
};

export default HotelSearch;