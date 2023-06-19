import React, { useState, useContext } from 'react';
import {
	Container,
	ButtonList,
	Input,
	List,
	ListItem,
	ListContainer,
} from '../styles/styles';

import useMapScroll from '../hooks/useMapScroll';

import Spinner from './Spinner'

import { APPEND_FETCH_PLACES } from '../redux/sagas';



import { useSelector, useDispatch } from 'react-redux';
import { addToVisit } from '../redux/placesToVisitSlice';
import {
	setIsListVisible,
} from '../redux/placesDisplaySlice';

const AttractionsList = ({ style }) => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);
	const places = useSelector((state) => state.placesDisplay.places);
	const selectedPlace = useSelector((state) => state.placesDisplay.selectedPlace);
	const currentCity = useSelector((state) => state.placesDisplay.lastSearchedCity);
	const isLoading = useSelector((state) => state.placesDisplay.isFetchingAttractions)
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
						<ButtonList onClick={handleToggleListVisibility}>
							{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
						</ButtonList>
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
											<ButtonList onClick={() => handleShowOnMapClick(place)}>
												Pokaż na mapie
											</ButtonList>
											<ButtonList
												onClick={() => handleAddToVisit(place)}
												disabled={isPlaceInVisitList(place.place_id)}
											>
												Dodaj do listy do odwiedzenia
											</ButtonList>
										</div>
									</ListItem>
								))
							)  : isCitySearched ? (
								<ButtonList onClick={handleShowAttractions}>
									Pokaż dostępne atrakcje turystyczne
								</ButtonList>
							): null}
						</List>
					)}
				</>
			)}
		</ListContainer>
	);
};

export default AttractionsList;