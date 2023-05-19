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
import axios from 'axios';

const RestaurantsList = ({
  restaurants,
  setMapSettings,
  setSelectedPlace,
  style,
  setShouldBounce,
  currentCity,
  setRestaurants,
  isCitySearched
}) => {
  const [isListVisible, setIsListVisible] = useState(true);
  const { handleScroll, resetScroll } = useContext(ScrollContext);

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

  const handleToggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const handleShowRestaurantsClick = async () => {
    try {
      const responseRestaurants = await axios.get(
        `http://localhost:5000/api/place/restaurants?query=${currentCity}`
      );

      if (
        responseRestaurants.data &&
        responseRestaurants.data.results &&
        responseRestaurants.data.results.length > 0
      ) {
        setRestaurants(responseRestaurants.data.results);
        handleScroll();
      } else {
        console.log('No restaurants found.');
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error searching restaurants:', error);
    }
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
          {restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <ListItem key={`${restaurant.place_id}-${index}`}>
                <div>
                  <h3>{restaurant.name}</h3>
                  <p>
                    <b>Adres: </b>
                    {restaurant.formatted_address}
                  </p>
                  <p>
                    <b>Ocena: </b>
                    {restaurant.rating ? `${restaurant.rating} ⭐` : 'Brak oceny'}
                  </p>
                  <ButtonList onClick={() => handleShowOnMapClick(restaurant)}>
                    Pokaż na mapie
                  </ButtonList>
                </div>
              </ListItem>
            ))
          ) : (
            isCitySearched && (
              <ButtonList onClick={handleShowRestaurantsClick}>
                Pokaż dostępne restauracje
              </ButtonList>
            )
          )}
        </List>
      )}
    </ListContainer>
  );
};

export default RestaurantsList;
