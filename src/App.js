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
  const [center, setCenter] = useState({ lat: 51.509865, lng: -0.118092 });
  const [lastSearchedCity, setLastSearchedCity] = useState('London');
  const [lastSearchedCoordinates, setLastSearchedCoordinates] = useState({ lat: 51.509865, lng: -0.118092 });
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [zoom, setZoom] = useState(15);

  return (
    <div>
      <SearchBar setPlaces={setPlaces} setCenter={setCenter} setLastSearchedCity={setLastSearchedCity} setLastSearchedCoordinates={setLastSearchedCoordinates} />
      <HotelSearch setHotels={setHotels} lastSearchedCity={lastSearchedCity} />
      <RestaurantSearch setRestaurants={setRestaurants} lastSearchedCity={lastSearchedCity} />
      
      <MapContainer setSelectedPlace={setSelectedPlace} places={places} center={lastSearchedCoordinates} zoom={zoom} />
      
      {selectedPlace && <PlaceDetails place={selectedPlace} />}
      
      <AttractionsList places={places} setCenter={setCenter} setZoom={setZoom} />
      <HotelsList hotels={hotels} setCenter={setCenter} setZoom={setZoom} />
      <RestaurantsList restaurants={restaurants} setCenter={setCenter} setZoom={setZoom} />
    </div>
  );
};

export default App;
