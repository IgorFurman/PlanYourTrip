import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ScrollContext } from '../utils/scrollContext/ScrollContext';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/loadingSlice';
import {
	Header,
	Input,
	ButtonSearch,
	CheckBoxWrapper,
	CheckBox,
	CheckBoxLabel,
	Form,
} from '../styles/styles.js';
import LogoImg from '../images/PlanYourTrip-logo.png';
import Spinner from './Spinner'

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
	handleSearchBarInput,
	isCitySearched,
}) => {
	const [search, setSearch] = useState('');
	const [showAttractions, setShowAttractions] = useState(true);
	const [showHotels, setShowHotels] = useState(false);
	const [showRestaurants, setShowRestaurants] = useState(false);
	const { handleScroll, resetScroll, searchBarRef } = useContext(ScrollContext);

	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.loading.isLoading);

	const clearData = () => {
		setHotels([]);
		setRestaurants([]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		resetScroll();
		dispatch(setLoading(true));
		try {
			let shouldScroll = false;
			let shouldClearData = false;

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
					shouldClearData = true;
				} else {
					console.log('No results found.');
					clearData();
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
					if (!isCitySearched) {
						shouldClearData = true;
					}
					addPlaces(responseHotels.data.results);
					setHotels(responseHotels.data.results);
					shouldScroll = true;
				} else {
					console.log('No hotels found.');
					clearData();
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
					if (!isCitySearched) {
						shouldClearData = true;
					}
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

			if (shouldClearData) {
				clearData();
			}
		} catch (error) {
			console.error('Error searching Google Places API:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<Header ref={searchBarRef}>
			<Form onSubmit={handleSubmit}>
				<Input
					type='text'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						handleSearchBarInput(e.target.value);
					}}
					placeholder='Wpisz miasto...'
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
				{isLoading ? (
					<Spinner />
				) : (
					<ButtonSearch type='submit'>Szukaj</ButtonSearch>
				)}
			</Form>
			<img className='logo' src={LogoImg} alt='Plan Your Trip logo' />
		</Header>
	);
	
};

export default SearchBar;
