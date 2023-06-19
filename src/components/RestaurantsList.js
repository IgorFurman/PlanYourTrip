import React, { useState, useContext } from 'react';
import {
	Container,
	ButtonList,
	Input,
  ButtonToggleShowList,
	List,
	ListItem,
	ListContainer,
} from '../styles/styles';


import Spinner from './Spinner'



import { useDispatch, useSelector } from 'react-redux';

import {APPEND_FETCH_RESTAURANTS} from '../redux/sagas'
import { addToVisit } from '../redux/placesToVisitSlice';

import useMapScroll from '../hooks/useMapScroll';


const RestaurantsList = ({
	
	style,

}) => {
	const [isListVisible, setIsListVisible] = useState(true);
  
	const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.placesDisplay.isFetchingRestaurants)
	const placesToVisit = useSelector((state) => state.placesToVisit);
	const restaurants = useSelector((state) => state.placesDisplay.restaurants);
	const currentCity = useSelector(
		(state) => state.placesDisplay.lastSearchedCity
	);
	const isCitySearched = Boolean(currentCity);


	const handleFetchRestaurants = () => {
  dispatch({ type: APPEND_FETCH_RESTAURANTS, payload: currentCity });
	};


	const handleShowOnMapClick = useMapScroll();

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
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {restaurants.length > 0 ? (
            <ButtonToggleShowList onClick={handleToggleListVisibility}>
              {isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
            </ButtonToggleShowList>
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
                    <ButtonList onClick={handleFetchRestaurants}>
                      Pokaż dostępne restauracje
                    </ButtonList>
                  )}
            </List>
          )}
        </>
      )}
    </ListContainer>
  );
};



export default RestaurantsList;
