import React, { useState, useContext } from 'react';
import { Container, ButtonList, Input, List, ListItem, ListContainer } from '../styles';
import { ScrollContext } from './ScrollContext';



const HotelsList = ({ hotels, setMapSettings, setSelectedPlace, style,setShouldBounce}) => {
	const [isListVisible, setIsListVisible, ] = useState(true);
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
		handleScroll()
		resetScroll()
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};


return (
		<ListContainer style={style}>
			<h2>Hotele:</h2>
			<ButtonList onClick={handleToggleListVisibility}>
				{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
			</ButtonList>
			{isListVisible && (
				<List>
					{hotels.length > 0 ? (
						hotels.map((hotel, index) => (
							<ListItem key={`${hotel.place_id}- ${index}`}>
								<div>
									<h3>{hotel.name}</h3>
									<p><b>Adres: </b>{hotel.formatted_address}</p>
									<p>
										<b>Ocena: </b>{hotel.rating ? `${hotel.rating} ⭐` : 'Brak oceny'}
									</p>
									<ButtonList onClick={() => handleShowOnMapClick(hotel)}>
										Pokaż na mapie
									</ButtonList>
								</div>
							</ListItem>
						))
					) : (
						<p>Pobierz dostępne hotele</p>
					)}
				</List>
			)}
		</ListContainer>
	);
};

export default HotelsList;
