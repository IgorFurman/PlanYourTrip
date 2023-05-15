import React, { useState, useContext } from 'react';
import { Container, ButtonList, Input, List, ListItem, ListContainer } from '../styles';

import { ScrollContext } from './ScrollContext';

const AttractionsList = ({
	places,
	setMapSettings,
	setSelectedPlace,
	placesToVisit,
	addToVisit,
	removeFromVisit,
	style,
	setShouldBounce
}) => {
	const [lastSelectedPlace, setLastSelectedPlace] = useState(null);
	const [isListVisible, setIsListVisible] = useState(true);
	const [isHighestRatedFiltered, setIsHighestRatedFiltered] = useState(false);

	const { calculateHeight } = useContext(ScrollContext);

	const handleShowOnMapClick = (place) => {
		setShouldBounce(true)
		setSelectedPlace(place);
		setMapSettings({
			center: {
				lat: place.geometry.location.lat,
				lng: place.geometry.location.lng,
			},
			zoom: 18,
		});
		window.scrollTo({ top: calculateHeight(), behavior: 'smooth' });
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	

	return (
		<ListContainer style={style}>
			<h2>Atrakcje turystyczne:</h2>
			<ButtonList onClick={handleToggleListVisibility}>
				{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
			</ButtonList>
			{isListVisible && (
				<List>
					{places.map((place, index) => (
						<ListItem key={`${place.place_id}-${index}`}>
							<div>
								<strong>{place.name}</strong>
								<p>Adres: {place.formatted_address}</p>
								<p>
									Ocena: {place.rating ? `${place.rating} ⭐` : 'Brak oceny'}
								</p>
								<ButtonList onClick={() => handleShowOnMapClick(place)}>
									Pokaż na mapie
								</ButtonList>
								{!isPlaceInVisitList(place.place_id) ? (
									<ButtonList onClick={() => addToVisit(place)}>
										Dodaj do listy do odwiedzenia
									</ButtonList>
								) : (
									<ButtonList onClick={() => removeFromVisit(place.place_id)}>
										Usuń z listy do odwiedzenia
									</ButtonList>
								)}
							</div>
						</ListItem>
					))}
				</List>
			)}
			{lastSelectedPlace && (
				<div>
					<h3>{lastSelectedPlace.name}</h3>
					<p>{lastSelectedPlace.formatted_address}</p>
				</div>
			)}
		</ListContainer>
	);
};

export default AttractionsList;
