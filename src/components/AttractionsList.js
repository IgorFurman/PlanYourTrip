import React, { useState } from 'react';
import { Container, ButtonList, Input, List, ListItem } from '../styles.js';

const AttractionsList = ({ places, setCenter, setZoom }) => {
	const [lastSelectedPlace, setLastSelectedPlace] = useState(null);
	const [isListVisible, setIsListVisible] = useState(true);

	const handleShowOnMapClick = (place) => {
		setCenter({
			lat: place.geometry.location.lat,
			lng: place.geometry.location.lng,
		});
		setZoom(18);
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	if (!places || places.length === 0) {
		return <div>Brak atrakcji turystycznych</div>;
	}

	return (
		<div>
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
		</div>
	);
};

export default AttractionsList;
