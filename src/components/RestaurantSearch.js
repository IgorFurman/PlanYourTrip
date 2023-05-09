import React from 'react';
import axios from 'axios';
import { Button } from '../styles.js'
const RestaurantSearch = ({ lastSearchedCity, setRestaurants }) => {
	const getRestaurants = async (e) => {
		e.preventDefault();
		try {
      const response = await axios.get(`http://localhost:5000/api/place/restaurants?query=${lastSearchedCity}`);
      // ...
			if (
				response.data &&
				response.data.results &&
				response.data.results.length > 0
			) {
				setRestaurants(response.data.results);
			} else {
				console.log('No restaurants found.');
			}
		} catch (error) {
			console.error('Error searching Google Places API:', error);
			console.log(error.response.data);
		}
	};

	return <Button onClick={getRestaurants}>Pokaż restauracje</Button>;
};

export default RestaurantSearch;