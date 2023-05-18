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

	const { handleScroll, resetScroll } = useContext(ScrollContext);

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
		handleScroll();
		resetScroll()
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
									<h3>{restaurant.name}</h3>
									<p><b>Adres: </b>{restaurant.formatted_address}</p>
									<p>
									<b>Ocena: </b>{' '}
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
