import React from 'react';
import axios from 'axios';
import { ButtonSearch } from '../styles.js';

const RestaurantSearch = ({
	lastSearchedCity,
	setRestaurants,
	handleShowRestaurants,
	addPlaces,
  isCitySearched
}) => {
	const getRestaurants = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`http://localhost:5000/api/place/restaurants?query=${lastSearchedCity}`
			);

			if (
				response.data &&
				response.data.results &&
				response.data.results.length > 0
			) {
				addPlaces(response.data.results);
				setRestaurants(response.data.results);
				handleShowRestaurants();
			} else {
				setRestaurants([]);
			}
		} catch (error) {
			console.error('Error searching Google Places API:', error);
			console.log(error.response.data);
		}
	};

	return (
		<ButtonSearch onClick={getRestaurants} disabled={!isCitySearched}>Pokaż restauracje</ButtonSearch>
	);
};

export default RestaurantSearch;
