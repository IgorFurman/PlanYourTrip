import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Container, Button, Input, List, ListItem } from '../styles.js'

const Marker = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

const MapContainer = ({ places, center, selectedPlace, zoom }) => {

  if (!places || places.length === 0) {
    return <div>Wczytywanie mapy...</div>;
  }

  return (
    <div style={{ height: '50vh', width: '90%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={center}
        zoom={zoom}
      >
        {selectedPlace && (
          <Marker
            lat={selectedPlace.geometry.location.lat}
            lng={selectedPlace.geometry.location.lng}
            text={selectedPlace.name}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
