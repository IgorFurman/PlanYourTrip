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

import { useDispatch, useSelector } from 'react-redux';
import { addToVisit } from '../redux/placesToVisitSlice';
import { FETCH_HOTELS } from '../redux/sagas'; 

const HotelsList = ({
 
  setMapSettings,
  setSelectedPlace,
  style,
  setShouldBounce,
  isCitySearched,
}) => {
  const dispatch = useDispatch();
  const placesToVisit = useSelector((state) => state.placesToVisit)
	const currentCity = useSelector((state) => state.placesDisplay.lastSearchedCity);
	const hotels = useSelector((state) => state.placesDisplay.hotels);
	

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

  const isPlaceInVisitList = (placeId) => {
    return placesToVisit.some((place) => place.place_id === placeId);
  };

  const handleAddToVisit = (hotel) => {
    dispatch(addToVisit(hotel));
  };

  const handleToggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

	const handleShowHotelsClick = () => {
		dispatch({ type: FETCH_HOTELS, payload: currentCity });
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
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
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
                  <ButtonList
                    onClick={() => handleAddToVisit(hotel)}
                    disabled={isPlaceInVisitList(hotel.place_id)}
                  >
                    Dodaj do listy do odwiedzenia
                  </ButtonList>
                </div>
              </ListItem>
            ))
          ) : isCitySearched ? (
            <ButtonList onClick={handleShowHotelsClick}>
              Pokaż dostępne hotele
            </ButtonList>
          ) : null}
        </List>
      )}
    </ListContainer>
  );
};

export default HotelsList;
