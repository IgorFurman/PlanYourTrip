import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';
import HotelSearch from './components/HotelSearch';
import HotelsList from './components/HotelsList';
import RestaurantSearch from './components/RestaurantSearch';
import RestaurantsList from './components/RestaurantsList';
import PlaceDetails from './components/PlaceDetails';

import { Container } from './styles';

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [lastSearchedCity, setLastSearchedCity] = useState('London');
  const [lastSearchedCoordinates, setLastSearchedCoordinates] = useState({ lat: 51.509865, lng: -0.118092 });
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [mapSettings, setMapSettings] = useState({ center: lastSearchedCoordinates, zoom: 15 });

  const handleSetSelectedPlace = (place) => {
    setSelectedPlace(place);
    setMapSettings({ center: { lat: place.geometry.location.lat, lng: place.geometry.location.lng }, zoom: 15 });
  }

  return (
    <div>
      <SearchBar  setPlaces={setPlaces}
        setMapSettings={setMapSettings}
        setLastSearchedCity={setLastSearchedCity}
        setLastSearchedCoordinates={setLastSearchedCoordinates} />
      <HotelSearch setHotels={setHotels} lastSearchedCity={lastSearchedCity} />
      <RestaurantSearch setRestaurants={setRestaurants} lastSearchedCity={lastSearchedCity} />
      
      <MapContainer setSelectedPlace={handleSetSelectedPlace} places={places} mapSettings={mapSettings} />
      
      {selectedPlace && <PlaceDetails place={selectedPlace} />}
      
      <AttractionsList places={places} setMapSettings={setMapSettings} setSelectedPlace={handleSetSelectedPlace} />
      <HotelsList hotels={hotels} setMapSettings={setMapSettings} />
      <RestaurantsList restaurants={restaurants} setMapSettings={setMapSettings} />
    </div>
  );
};

export default App;
