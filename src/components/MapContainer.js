import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainerStyled, PinStyled, InfoWindow } from '../styles.js'
import Pin from '../images/pin.png'

const Marker = ({ text, place, setSelectedPlace, selected }) => (
  <div onClick={() => setSelectedPlace(place)}>
    <PinStyled src={Pin} alt={text} />
    {selected && (
      <InfoWindow>
        <h2>{place.name}</h2>
        {/* Include other details about the place here */}
      </InfoWindow>
    )}
  </div>
);

const MapContainer = ({ places, center, lastSearchedCity, zoom, setSelectedPlace, selectedPlace }) => {
  const [mapCenter, setMapCenter] = useState(center);

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  return (
    <MapContainerStyled>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        center={mapCenter}
        defaultZoom={zoom}
        zoom={zoom}
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
