import React from 'react';
import { ButtonList, PlaceDetailsStyled } from '../styles';

const PlaceDetails = ({ place, addToVisit, removeFromVisit, placesToVisit }) => {
  const isPlaceInVisitList = (placeId) => {
    return placesToVisit.some((place) => place.place_id === placeId);
  };

  return (
    <PlaceDetailsStyled>
      <h2>{place.name}</h2>
      <p>{place.formatted_address}</p>
      {place.rating && <p>Rating: {place.rating}⭐</p>}
      {place.website && (
        <p>
          <a href={place.website}>Website</a>
        </p>
      )}
      {place.photos && place.photos.length > 0 ? (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
          alt={place.name}
        />
      ) : (
        <p>Brak zdjęcia</p>
      )}
      {!isPlaceInVisitList(place.place_id) ? (
        <ButtonList onClick={() => addToVisit(place)}>
          Dodaj do listy do odwiedzenia
        </ButtonList>
      ) : (
        <ButtonList onClick={() => removeFromVisit(place.place_id)}>
          Usuń z listy do odwiedzenia
        </ButtonList>
      )}
    </PlaceDetailsStyled>
  );
};

export default PlaceDetails;
