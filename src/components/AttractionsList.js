import React, { useState } from 'react';

const AttractionsList = ({ places, setCenter, setZoom }) => {
  const [lastSelectedPlace, setLastSelectedPlace] = useState(null);

  const handleShowOnMapClick = (place) => {
    setLastSelectedPlace(place);
    setCenter({ lat: place.geometry.location.lat, lng: place.geometry.location.lng });
    setZoom(18);
  };

  if (!places || places.length === 0) {
    return <div>Brak atrakcji turystycznych</div>;
  }

  return (
    <div>
      <h2>Atrakcje turystyczne:</h2>
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>
            <div>
              <strong>{place.name}</strong>
              <p>Adres: {place.formatted_address}</p>
              <p>Ocena: {place.rating ? `${place.rating} ⭐` : 'Brak oceny'}</p>
              <button onClick={() => handleShowOnMapClick(place)}>Pokaż na mapie</button>
            </div>
          </li>
        ))}
      </ul>
      {lastSelectedPlace && (
        <div>
          <h3>{lastSelectedPlace.name}</h3>
          <p>{lastSelectedPlace.formatted_address}</p>
        </div>
      )}
    </div>
  );
};

export default AttractionsList;