import React from 'react';

const PlaceDetails = ({ place }) => {
  return (
    <div>
      <h2>{place.name}</h2>
      <p>{place.formatted_address}</p>
      {place.rating && <p>Rating: {place.rating}</p>}
      {place.website && <p><a href={place.website}>Website</a></p>}
      {place.photos && place.photos.length > 0 && <img src={place.photos[0]} alt={place.name} />}
    </div>
  );
};

export default PlaceDetails;
