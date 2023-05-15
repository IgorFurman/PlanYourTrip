import React, { useState, useContext } from 'react';
import { Container, ButtonList, Input, List, ListItem, ListContainer } from '../styles';
import { ScrollContext } from './ScrollContext';



const HotelsList = ({ hotels, setMapSettings, setSelectedPlace, style,setShouldBounce}) => {
	const [isListVisible, setIsListVisible, ] = useState(true);
  const { calculateHeight } = useContext(ScrollContext);
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
		window.scrollTo({ top: calculateHeight(), behavior: 'smooth' });
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	if (!hotels || hotels.length === 0) {
		return <div>Brak hoteli</div>;
	}

	return (
		<ListContainer style={style}>
			<h2>Hotele:</h2>
			<ButtonList onClick={handleToggleListVisibility}>
				{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
			</ButtonList>
			{isListVisible && (
				<List>
					{hotels.map((hotel, index) => (
						<ListItem key={`${hotel.place_id}- ${index}`}>
							<div>
								<strong>{hotel.name}</strong>
								<p>Adres: {hotel.formatted_address}</p>
								<p>
									Ocena: {hotel.rating ? `${hotel.rating} ⭐` : 'Brak oceny'}
								</p>
								<ButtonList onClick={() => handleShowOnMapClick(hotel)}>
									Pokaż na mapie
								</ButtonList>
							</div>
						</ListItem>
					))}
				</List>
			)}
		</ListContainer>
	);
};

export default HotelsList;
