import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';
import HotelSearch from './components/HotelSearch';
import HotelsList from './components/HotelsList';
import RestaurantSearch from './components/RestaurantSearch';
import RestaurantList from './components/RestaurantList';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({ lat: 51.509865, lng: -0.118092 });
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  const [zoom, setZoom] = useState(15);

  const setSelectedPlace = (place) => {
    setCenter(place.geometry.location);
  };

  return (
    <div>
      <SearchBar setPlaces={setPlaces} setCenter={setCenter} setLastSearchedCity={setLastSearchedCity}/>
      <HotelSearch setHotels={setHotels} lastSearchedCity={lastSearchedCity} />
      <RestaurantSearch setRestaurants={setRestaurants} lastSearchedCity={lastSearchedCity} />
      <MapContainer places={places} center={center} zoom={zoom} />
      <AttractionsList places={places} setSelectedPlace={setSelectedPlace} setCenter={setCenter} setZoom={setZoom} />
      <HotelsList hotels={hotels} />
      <RestaurantList restaurants={restaurants} />
      
    </div>
  );
};

export default App;
