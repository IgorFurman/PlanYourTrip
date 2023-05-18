import React, { useState, useContext } from 'react';
import axios from 'axios';

import { ScrollContext } from './ScrollContext';

import {
	Header,
	Input,
	ButtonSearch,
	CheckBoxWrapper,
	CheckBox,
	CheckBoxLabel,
} from '../styles.js';
import LogoImg from '../images/PlanYourTrip-logo.png';

const SearchBar = ({
	setPlaces,
	setMapSettings,
	setLastSearchedCity,
	setLastSearchedCoordinates,
	setHotels,
	setRestaurants,
	setSelectedPlace,
	setIsCitySearched,
	addPlaces,
	isCitySearched,
	handleShowRestaurants,
	handleShowHotels,
}) => {
	const [search, setSearch] = useState('');
	const [showAttractions, setShowAttractions] = useState(false);
	const [showHotels, setShowHotels] = useState(false);
	const [showRestaurants, setShowRestaurants] = useState(false);
	const { handleScroll, resetScroll, searchBarRef } = useContext(ScrollContext);


	const handleSubmit = async (e) => {
		e.preventDefault();
		resetScroll()
		try {
			let shouldScroll = false;
		
			if (showAttractions) {
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
					setMapSettings({ center: { lat, lng }, zoom: 10 });
					setLastSearchedCoordinates({ lat, lng });
					setLastSearchedCity(search);
					setSelectedPlace(null);
					setIsCitySearched(true);
					shouldScroll = true;
				} else {
					console.log('No results found.');
				}
			}
			if (showHotels) {
				const responseHotels = await axios.get(
					`http://localhost:5000/api/place/hotels?query=${search}`
				);
	
				if (
					responseHotels.data &&
					responseHotels.data.results &&
					responseHotels.data.results.length > 0
				) {
					addPlaces(responseHotels.data.results);
					setHotels(responseHotels.data.results);
					shouldScroll = true;
				} else {
					console.log('No hotels found.');
					setHotels([]);
				}
			}
			if (showRestaurants) {
				const responseRestaurants = await axios.get(
					`http://localhost:5000/api/place/restaurants?query=${search}`
				);
	
				if (
					responseRestaurants.data &&
					responseRestaurants.data.results &&
					responseRestaurants.data.results.length > 0
				) {
					addPlaces(responseRestaurants.data.results);
					setRestaurants(responseRestaurants.data.results);
					shouldScroll = true;
				} else {
					console.log('No restaurants found.');
					setRestaurants([]);
				}
			}
	
			if (shouldScroll) {
				handleScroll();
			}
		} catch (error) {
			console.error('Error searching Google Places API:', error);
		}
	};
	

	return (
		<Header ref={searchBarRef}>
			<form onSubmit={handleSubmit}>
				<Input
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<CheckBoxWrapper>
					<CheckBox
						checked={showAttractions}
						onChange={(e) => setShowAttractions(e.target.checked)}
						id='attractions'
					/>
					<CheckBoxLabel htmlFor='attractions'>
						Atrakcje turystyczne
					</CheckBoxLabel>

					<CheckBox
						checked={showHotels}
						onChange={(e) => setShowHotels(e.target.checked)}
						id='hotels'
					/>
					<CheckBoxLabel htmlFor='hotels'>Hotele</CheckBoxLabel>

					<CheckBox
						checked={showRestaurants}
						onChange={(e) => setShowRestaurants(e.target.checked)}
						id='restaurants'
					/>
					<CheckBoxLabel htmlFor='restaurants'>Restauracje</CheckBoxLabel>
				</CheckBoxWrapper>
				<ButtonSearch type='submit'>Szukaj</ButtonSearch>
			</form>
			<img className='logo' src={LogoImg} alt='Plan Your Trip logo' />
		</Header>
	);
};

export default SearchBar;
