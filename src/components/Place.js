import React from 'react';

const Place = ({ place }) => {
  return (
    <li>
      <h3>{place.name}</h3>
      <p>Adres: {place.formatted_address}</p>
      <p>Współrzędne: {place.geometry.location.lat}, {place.geometry.location.lng}</p>
    </li>
  );
};

export default Place;