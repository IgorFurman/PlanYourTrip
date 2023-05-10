import React, { useState } from 'react';
import axios from 'axios';
import { Header, Input,  ButtonSearch, Logo } from '../styles.js';

import LogoImg from '../images/PlanYourTrip-logo.png'

const SearchBar = ({
	setPlaces,
	setCenter,
	setLastSearchedCity,
	setLastSearchedCoordinates,
}) => {
	const [search, setSearch] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`http://localhost:5000/api/place/attractions?query=${search}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
			);
			if (
				response.data &&
				response.data.results &&
				response.data.results.length > 0
			) {
				setPlaces(response.data.results);
				const { lat, lng } = response.data.results[0].geometry.location;
				setCenter({ lat, lng });
				setLastSearchedCoordinates({ lat, lng }); 
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
				<Input
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<ButtonSearch type='submit'>Szukaj</ButtonSearch>
			</form>
			<Logo src={LogoImg} alt="Plan Your Trip logo" />
		</Header>
	);
};

export default SearchBar;
