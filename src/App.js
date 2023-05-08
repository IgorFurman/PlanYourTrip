import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState({ lat: 51.509865, lng: -0.118092 });

  return (
    <div>
      <SearchBar setPlaces={setPlaces} setCenter={setCenter} />
      <MapContainer places={places} center={center} />
      <AttractionsList places={places} />
    </div>
  );
};

export default App;
