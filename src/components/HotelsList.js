import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
	Container,
	ButtonList,
	Input,
	List,
	ListItem,
	ListContainer,
} from '../styles/styles';


import useMapScroll from '../hooks/useMapScroll';

import { useDispatch, useSelector } from 'react-redux';
import { addToVisit } from '../redux/placesToVisitSlice';
import { APPEND_FETCH_HOTELS } from '../redux/sagas';

import { setIsListVisible,  } from '../redux/placesDisplaySlice';

const HotelsList = ({ style }) => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);
	const currentCity = useSelector((state) => state.placesDisplay.lastSearchedCity);
	const hotels = useSelector((state) => state.placesDisplay.hotels);
	const [isListVisible, setIsListVisible] = useState(true);
const isCitySearched = Boolean(currentCity);

	const handleShowOnMapClick = useMapScroll();

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	const handleAddToVisit = (hotel) => {
		dispatch(addToVisit(hotel));
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	const handleShowHotelsClick = () => {
		dispatch({ type: APPEND_FETCH_HOTELS, payload: currentCity });
	};

	return (
		<ListContainer style={style}>
			<h2>Hotele:</h2>
			{hotels.length > 0 ? (
				<ButtonList onClick={handleToggleListVisibility}>
					{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
				</ButtonList>
			) : (
				<p>Tutaj zobaczysz listę wyszukanych hoteli.</p>
			)}
			{isListVisible && (
				<List>
					{hotels.length > 0 ? (
						hotels.map((hotel, index) => (
							<ListItem key={`${hotel.place_id}-${index}`}>
								<div>
									<h3>{hotel.name}</h3>
									<p>
										<b>Adres: </b>
										{hotel.formatted_address}
									</p>
									<p>
										<b>Ocena: </b>
										{hotel.rating ? `${hotel.rating} ⭐` : 'Brak oceny'}
									</p>
									<ButtonList onClick={() => handleShowOnMapClick(hotel)}>
										Pokaż na mapie
									</ButtonList>
									<ButtonList
										onClick={() => handleAddToVisit(hotel)}
										disabled={isPlaceInVisitList(hotel.place_id)}
									>
										Dodaj do listy do odwiedzenia
									</ButtonList>
								</div>
							</ListItem>
						))
					) : isCitySearched ? (
						<ButtonList onClick={handleShowHotelsClick}>
							Pokaż dostępne hotele
						</ButtonList>
					) : null}
				</List>
			)}
		</ListContainer>
	);
};

export default HotelsList;
