import React, { useState, useContext } from 'react';
import {
	Container,
	ButtonList,
	ButtonToggleShowList,
	Input,
	List,
	ListItem,
	ListContainer,
} from '../styles/styles';

import useMapScroll from '../hooks/useMapScroll';

import Spinner from './Spinner';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPlusSquare } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';

import { APPEND_FETCH_PLACES } from '../redux&saga/sagas';

import { useSelector, useDispatch } from 'react-redux';
import { addToVisit } from '../redux&saga/placesToVisitSlice';
import { setIsListVisible } from '../redux&saga/placesDisplaySlice';

const AttractionsList = ({ style }) => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);
	const places = useSelector((state) => state.placesDisplay.places);
	const selectedPlace = useSelector(
		(state) => state.placesDisplay.selectedPlace
	);
	const currentCity = useSelector(
		(state) => state.placesDisplay.lastSearchedCity
	);
	const isLoading = useSelector(
		(state) => state.placesDisplay.isFetchingAttractions
	);
	const [isListVisible, setIsListVisible] = useState(true);
	const isCitySearched = Boolean(currentCity);

	const handleAddToVisit = (place) => {
		dispatch(addToVisit(place));
	};

	const handleShowOnMapClick = useMapScroll();

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	const handleShowAttractions = () => {
		dispatch({ type: APPEND_FETCH_PLACES, payload: currentCity });
	};

	return (
		<ListContainer style={style}>
			<h2>Atrakcje turystyczne:</h2>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					{places.length > 0 ? (
						<ButtonToggleShowList onClick={handleToggleListVisibility}>
							{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
						</ButtonToggleShowList>
					) : (
						<p>Tutaj zobaczysz listę wyszukanych atrakcji turystycznych.</p>
					)}
					{isListVisible && (
						<List>
							{places.length > 0 ? (
								places.map((place, index) => (
									<ListItem key={`${place.place_id}-${index}`}>
										<div>
											<h3>{place.name}</h3>
											<p>
												<b>Adres: </b>
												{place.formatted_address}
											</p>
											<p>
												<b>Ocena: </b>
												{place.rating ? `${place.rating} ⭐` : 'Brak oceny'}
											</p>
											<ButtonList
												style={{ marginBottom: '2px' }}
												onClick={() => handleShowOnMapClick(place)}
											>
												<FaMapMarkerAlt /> Pokaż na mapie
											</ButtonList>
											<ButtonList
												onClick={() => handleAddToVisit(place)}
												disabled={isPlaceInVisitList(place.place_id)}
											>
												<FaPlusSquare />
												Dodaj do listy do odwiedzenia
											</ButtonList>
										</div>
									</ListItem>
								))
							) : isCitySearched ? (
								<ButtonList onClick={handleShowAttractions}>
									<BiShow /> Pokaż dostępne atrakcje
								</ButtonList>
							) : null}
						</List>
					)}
				</>
			)}
		</ListContainer>
	);
};

export default AttractionsList;
