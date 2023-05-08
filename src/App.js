import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapContainer from './components/MapContainer';
import PlacesList from './components/PlacesList';

function App() {
  const [places, setPlaces] = useState([]);

  return (
    <div className="App">
      <SearchBar setPlaces={setPlaces} />
      <MapContainer places={places} />
      <PlacesList places={places} />
    </div>
  );
}

export default App;