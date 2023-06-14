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
import { ScrollContext } from '../utils/scrollContext/ScrollContext';

const HotelsList = ({
	hotels,
	setMapSettings,
	setSelectedPlace,
	style,
	setShouldBounce,
	currentCity,
	setHotels,
	isCitySearched,
}) => {
	const [isListVisible, setIsListVisible] = useState(true);
	const { handleScroll, resetScroll } = useContext(ScrollContext);

	const handleShowOnMapClick = (hotel) => {
		setShouldBounce(true);
		setSelectedPlace(hotel);
		setMapSettings({
			center: {
				lat: hotel.geometry.location.lat,
				lng: hotel.geometry.location.lng,
			},
			zoom: 18,
		});
		handleScroll();
		resetScroll();
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	const handleShowHotelsClick = async () => {
		try {
			const responseHotels = await axios.get(
				`http://localhost:5000/api/place/hotels?query=${currentCity}`
			);

			if (
				responseHotels.data &&
				responseHotels.data.results &&
				responseHotels.data.results.length > 0
			) {
				if (
					JSON.stringify(hotels) !== JSON.stringify(responseHotels.data.results)
				) {
					setHotels(responseHotels.data.results);
					handleScroll();
				}
			} else {
				console.log('No hotels found.');
				setHotels([]);
			}
		} catch (error) {
			console.error('Error searching hotels:', error);
		}
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
					{hotels.length > 0
						? hotels.map((hotel, index) => (
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
									</div>
								</ListItem>
						  ))
						: isCitySearched && (
								<ButtonList onClick={handleShowHotelsClick}>
									Pokaż dostępne hotele
								</ButtonList>
						  )}
				</List>
			)}
		</ListContainer>
	);
};

export default HotelsList;
