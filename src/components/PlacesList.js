import React from 'react';
import Place from './Place';

const PlacesList = ({ places }) => {
  return (
    <div>
      <h2>Lista miejsc</h2>
      <ul>
        {places.map((place) => (
          <Place key={place.place_id} place={place} />
        ))}
      </ul>
    </div>
  );
};

export default PlacesList;