import React, { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';
import HotelSearch from './components/HotelSearch';
import HotelsList from './components/HotelsList';
import RestaurantSearch from './components/RestaurantSearch';
import RestaurantsList from './components/RestaurantsList';
import PlaceDetails from './components/PlaceDetails';
import PlacesToVisitList from './components/PlacesToVisitList';

import { Container } from './styles';





const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [lastSearchedCity, setLastSearchedCity] = useState('London');
  const [lastSearchedCoordinates, setLastSearchedCoordinates] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [placesToVisit, setPlacesToVisit] = useState([]);
  const [mapSettings, setMapSettings] = useState({
    center: lastSearchedCoordinates,
    zoom: 15,
  });

  const hotelsListRef = useRef(null);
  const restaurantsListRef = useRef();

  const handleSetSelectedPlace = (place) => {
    setSelectedPlace(place);
    setMapSettings({
      center: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      zoom: 15,
    });
  };

  const addToVisit = (place) => {
    setPlacesToVisit((prevPlaces) => [...prevPlaces, place]);
  };

  const removeFromVisit = (placeId) => {
    setPlacesToVisit((prevPlaces) =>
      prevPlaces.filter((place) => place.place_id !== placeId)
    );
  };

  const handleShowHotels = () => {
    if (hotelsListRef.current) {
      hotelsListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowRestaurants = () => {
    if (restaurantsListRef.current) {
      restaurantsListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addPlaces = (newPlaces) => {
    setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
  };

  return (
    <div>
      <SearchBar
        setPlaces={setPlaces}
        setMapSettings={setMapSettings}
        setLastSearchedCity={setLastSearchedCity}
        setLastSearchedCoordinates={setLastSearchedCoordinates}
      />
      {selectedPlace && (
        <PlaceDetails
          place={selectedPlace}
          addToVisit={addToVisit}
          removeFromVisit={removeFromVisit}
          placesToVisit={placesToVisit}
        />
      )}
      <HotelSearch
        setHotels={setHotels}
        lastSearchedCity={lastSearchedCity}
        handleShowHotels={handleShowHotels}
        addPlaces={addPlaces}
      />
      <RestaurantSearch
        setRestaurants={setRestaurants}
        lastSearchedCity={lastSearchedCity}
        handleShowRestaurants={handleShowRestaurants}
        addPlaces={addPlaces}
      />
      <PlacesToVisitList
        placesToVisit={placesToVisit}
        removeFromVisit={removeFromVisit}
      />
      <MapContainer
        setSelectedPlace={handleSetSelectedPlace}
        places={places}
        mapSettings={mapSettings}
      />
      <AttractionsList
        places={places}
        setMapSettings={setMapSettings}
        setSelectedPlace={setSelectedPlace}
		placesToVisit={placesToVisit}
		addToVisit={addToVisit}
		removeFromVisit={removeFromVisit}
		/>
		<div ref={hotelsListRef}>
		<HotelsList
			   hotels={hotels}
			   addToVisit={addToVisit}
			   removeFromVisit={removeFromVisit}
			 />
		</div>
		<div ref={restaurantsListRef}>
		<RestaurantsList
			   restaurants={restaurants}
			   addToVisit={addToVisit}
			   removeFromVisit={removeFromVisit}
			 />
		</div>
		</div>
		);
		};
		
		export default App;
	
