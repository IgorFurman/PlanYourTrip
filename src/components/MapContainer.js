import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <div style={{ color: 'red' }}>
    {text}
  </div>
);

const MapContainer = (props) => {
    
  const { places } = props;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
        defaultZoom={10}
      >
        {places.map((place) => (
          <Marker
            key={place.place_id}
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
            text={place.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
