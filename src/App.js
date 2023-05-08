import React, { useState, useEffect } from 'react';

import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
// import AttractionsList from './components/AttractionsList';
// import RestaurantsList from './components/RestaurantsList';
// import AccommodationsList from './components/AccommodationsList';

function App() {
  const [places, setPlaces] = useState([]);

  // Przykładowe dane (do zastąpienia danymi z API)
  useEffect(() => {
    const samplePlaces = [
      {
        place_id: '1',
        name: 'Place 1',
        geometry: {
          location: {
            lat: 51.509865,
            lng: -0.118092,
          },
        },
      },
      {
        place_id: '2',
        name: 'Place 2',
        geometry: {
          location: {
            lat: 51.519865,
            lng: -0.108092,
          },
        },
      },
    ];
    setPlaces(samplePlaces);
  }, []);
  return (
    <div className="App">
      <SearchBar />
      <div className="content">
        <MapContainer places={places}/>
        <div className="lists">
          {/* <AttractionsList />
          <RestaurantsList />
          <AccommodationsList /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
