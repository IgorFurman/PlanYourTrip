import React from 'react';

const AttractionsList = ({ places }) => {
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
              <p>Współrzędne: {place.geometry.location.lat}, {place.geometry.location.lng}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttractionsList;
