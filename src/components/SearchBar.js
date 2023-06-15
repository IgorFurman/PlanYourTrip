import React, { useState, useContext } from 'react';
import { ScrollContext } from '../utils/scrollContext/ScrollContext';
import { useDispatch, useSelector } from 'react-redux';
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
import Spinner from './Spinner';

import {  FETCH_PLACES, FETCH_HOTELS, FETCH_RESTAURANTS } from '../redux/sagas';
import { setFetchingPlaces } from '../redux/placesDisplaySlice';

const SearchBar = ({ handleSearchBarInput }) => {
	const [search, setSearch] = useState('');
	const [showAttractions, setShowAttractions] = useState(true);
	const [showHotels, setShowHotels] = useState(false);
	const [showRestaurants, setShowRestaurants] = useState(false);
	const { handleScroll, resetScroll, searchBarRef } = useContext(ScrollContext);

	const dispatch = useDispatch();
	const isFetchingPlaces = useSelector((state) => state.placesDisplay.isFetchingPlaces);


	const handleSubmit = (e) => {
		e.preventDefault();
		resetScroll();
	

		if (showAttractions) {
			dispatch({ type: FETCH_PLACES, payload: search });
		}
		if (showHotels) {
			dispatch({ type: FETCH_HOTELS, payload: search });
		}
		if (showRestaurants) {
			dispatch({ type: FETCH_RESTAURANTS, payload: search });
		}
	
		handleScroll();
		
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
				{isFetchingPlaces ? (
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
