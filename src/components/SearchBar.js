import React, { useState, useEffect, useRef } from 'react';

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
import { setSearch, selectSearch, setHasSearched } from '../redux/searchSlice';
import LogoImg from '../images/PlanYourTrip-logo.png';
import Spinner from './Spinner';

import { FETCH_PLACES, FETCH_HOTELS, FETCH_RESTAURANTS } from '../redux/sagas';



import { setHasScrolled, setSearchBarHeight} from '../redux/scrollSlice';


const SearchBar = React.forwardRef((props, ref) => {
	
	const [showAttractions, setShowAttractions] = useState(true);
	const [showHotels, setShowHotels] = useState(false);
	const [showRestaurants, setShowRestaurants] = useState(false);
	

	const dispatch = useDispatch();
	const isFetchingPlaces = useSelector(
		(state) => state.placesDisplay.isFetchingPlaces
	);
	const search = useSelector(selectSearch);


	const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setSearch(value));
    ;
  };


	const handleSubmit = (e) => {
		e.preventDefault();
		;
		dispatch(setHasSearched(true))

		if (showAttractions) {
			dispatch({ type: FETCH_PLACES, payload: search });
		}
		if (showHotels) {
			dispatch({ type: FETCH_HOTELS, payload: search });
		}
		if (showRestaurants) {
			dispatch({ type: FETCH_RESTAURANTS, payload: search });
		}
	
	;
	};

	useEffect(() => {
    dispatch(setSearchBarHeight(ref.current.getBoundingClientRect().height));
  }, [dispatch]);

	return (
		<Header ref={ref}>
			<Form onSubmit={handleSubmit}>
			<Input
          type='text'
          value={search}
          onChange={handleChange}
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
			<a href='/' className='logo-link'>
				<img className='logo' src={LogoImg} alt='Plan Your Trip logo' />
			</a>
		</Header>
	);
});

export default SearchBar;
