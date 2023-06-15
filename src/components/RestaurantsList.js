import React, { useState, useContext } from 'react';
import {
	Container,
	ButtonList,
	Input,
	List,
	ListItem,
	ListContainer,
} from '../styles/styles';
import { ScrollContext } from '../utils/scrollContext/ScrollContext';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { addToVisit } from '../redux/placesToVisitSlice';
import { setRestaurants } from '../redux/placesDisplaySlice';

const RestaurantsList = ({

	setMapSettings,
	setSelectedPlace,
	style,
	setShouldBounce,
	
	
	isCitySearched,
}) => {
	const [isListVisible, setIsListVisible] = useState(true);
	const { handleScroll, resetScroll } = useContext(ScrollContext);
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);
	const restaurants = useSelector((state) => state.placesDisplay.restaurants);
	const currentCity = useSelector((state) => state.placesDisplay.lastSearchedCity);

	const handleShowOnMapClick = (restaurant) => {
		setShouldBounce(true);
		setSelectedPlace(restaurant);
		setMapSettings({
			center: {
				lat: restaurant.geometry.location.lat,
				lng: restaurant.geometry.location.lng,
			},
			zoom: 20,
		});
		handleScroll();
		resetScroll();
	};

	const handleAddToVisit = (restaurant) => {
		dispatch(addToVisit(restaurant));
	};
	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	return (
		<ListContainer style={style}>
			<h2>Restauracje:</h2>
			{restaurants.length > 0 ? (
				<ButtonList onClick={handleToggleListVisibility}>
					{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
				</ButtonList>
			) : (
				<p>Tutaj zobaczysz listę wyszukanych restauracji.</p>
			)}
			{isListVisible && (
				<List>
					{restaurants.length > 0
						? restaurants.map((restaurant, index) => (
								<ListItem key={`${restaurant.place_id}-${index}`}>
									<div>
										<h3>{restaurant.name}</h3>
										<p>
											<b>Adres: </b>
											{restaurant.formatted_address}
										</p>
										<p>
											<b>Ocena: </b>
											{restaurant.rating
												? `${restaurant.rating} ⭐`
												: 'Brak oceny'}
										</p>
										<ButtonList
											onClick={() => handleShowOnMapClick(restaurant)}
										>
											Pokaż na mapie
										</ButtonList>
										<ButtonList
											onClick={() => handleAddToVisit(restaurant)}
											disabled={isPlaceInVisitList(restaurant.place_id)}
										>
											Dodaj do listy do odwiedzenia
										</ButtonList>
									</div>
								</ListItem>
						  ))
						: isCitySearched && (
								<ButtonList >
									Pokaż dostępne restauracje
								</ButtonList>
						  )}
				</List>
			)}
		</ListContainer>
	);
};

export default RestaurantsList;
