import React, { useState, useContext } from 'react';
import {
	Container,
	ButtonList,
	Input,
	List,
	ListItem,
	ListContainer,
} from '../styles';
import { ScrollContext } from './ScrollContext';

const RestaurantsList = ({
	restaurants,
	setMapSettings,
	setSelectedPlace,
	style,
  setShouldBounce
}) => {
	const [isListVisible, setIsListVisible] = useState(true);

	const { calculateHeight } = useContext(ScrollContext);

	const handleShowOnMapClick = (restaurant) => {
    setShouldBounce(true)
		setSelectedPlace(restaurant);
		setMapSettings({
			center: {
				lat: restaurant.geometry.location.lat,
				lng: restaurant.geometry.location.lng,
			},
			zoom: 20,
		});
		window.scrollTo({ top: calculateHeight(), behavior: 'smooth' });
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};



  return (
		<ListContainer style={style}>
			<h2>Restauracje:</h2>
			<ButtonList onClick={handleToggleListVisibility}>
				{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
			</ButtonList>
			{isListVisible && (
				<List>
					{restaurants.length > 0 ? (
						restaurants.map((restaurant, index) => (
							<ListItem key={`${restaurant.place_id}-${index}`}>
								<div>
									<strong>{restaurant.name}</strong>
									<p>Adres: {restaurant.formatted_address}</p>
									<p>
										Ocena:{' '}
										{restaurant.rating ? `${restaurant.rating} ⭐` : 'Brak oceny'}
									</p>
									<ButtonList onClick={() => handleShowOnMapClick(restaurant)}>
										Pokaż na mapie
									</ButtonList>
								</div>
							</ListItem>
						))
					) : (
						<p>Pobierz dostępne restauracje</p>
					)}
				</List>
			)}
		</ListContainer>
	);
};

export default RestaurantsList;
