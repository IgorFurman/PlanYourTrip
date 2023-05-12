import React from 'react';
import axios from 'axios';
import { ButtonSearch } from '../styles';

const HotelSearch = ({ lastSearchedCity, setHotels, handleShowHotels, addPlaces }) => {
  const getHotels = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/place/hotels?query=${lastSearchedCity}`);
  
      if (response.data && response.data.results && response.data.results.length > 0) {
        addPlaces(response.data.results); // 
        setHotels(response.data.results);
        handleShowHotels(); 
      } else {
        console.log('No hotels found.');
        setHotels([]);
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