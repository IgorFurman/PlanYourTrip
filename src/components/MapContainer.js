import React, { useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainerStyled, PinStyled, InfoWindow } from '../styles.js';
import Pin from '../images/pin.png';

const Marker = ({ text, place, setSelectedPlace, selected }) => (
  <div onClick={() => setSelectedPlace(place)}>
    <PinStyled src={Pin} alt={text} />
    {selected && (
      <InfoWindow>
        <h2>{place.name}</h2>
        <p>{place.formatted_address}</p>
        {place.rating && <p>Rating: {place.rating}</p>}
        {place.website && (
          <p>
            <a href={place.website}>Website</a>
          </p>
        )}
        {place.photos && place.photos.length > 0 && (
          <img src={place.photos[0]} alt={place.name} />
        )}
      </InfoWindow>
    )}
  </div>
);

const MapContainer = ({
  places,
  setSelectedPlace,
  selectedPlace,
  mapSettings,
}) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo(mapSettings.center);
      mapRef.current.setZoom(mapSettings.zoom);
    }
  }, [mapSettings]);

  return (
    <MapContainerStyled>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={mapSettings.center}
        zoom={mapSettings.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        {places.map((place, index) => (
          <Marker
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
            text={place.name}
            key={`${place.place_id}-${index}`}
            place={place}
            setSelectedPlace={setSelectedPlace}
            selected={selectedPlace && selectedPlace.place_id === place.place_id}
          />
        ))}
      </GoogleMapReact>
    </MapContainerStyled>
  );
};

export default MapContainer;
