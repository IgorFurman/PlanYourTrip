import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  MapContainerStyled,
  PinStyled,
  InfoWindowStyled,
  DetailsContainer,
} from '../styles.js';
import MapLegend from './MapLegend';
import AttractionsPin from '../images/AttractionsPin.png';
import HotelsPin from '../images/HotelsPin.png';
import RestaurantsPin from '../images/RestaurantsPin.png';

const MapContainer = ({
  places,
  setSelectedPlace,
  selectedPlace,
  mapSettings,
  style,
  setShouldBounce,
  shouldBounce,
  hotels,
}) => {
  const mapRef = useRef();
  const [detailsPosition, setDetailsPosition] = useState(null);

  const handleMarkerClick = (place, { x, y }) => {
    setSelectedPlace(place);
    setDetailsPosition({ x, y });
  };

  const Marker = ({ children, ...props }) => {
    const validProps = Object.keys(props).reduce((acc, key) => {
      if (!key.startsWith('$')) {
        acc[key] = props[key];
      }
      return acc;
    }, {});

    return <div {...validProps}>{children}</div>;
  };

  const getPinForPlace = (place) => {
    if (place.types.includes('lodging', 'hotel')) {
      return HotelsPin;
    }
    if (place.types.includes('restaurant')) {
      return RestaurantsPin;
    }
    if (place.types.includes('tourist_attraction')) {
      return AttractionsPin;
    }
    return AttractionsPin;
  };

  const handleFetchHotels = () => {
    if (hotels.length > 0) {
      hotels.forEach((hotel) => {
        const marker = document.createElement('div');
        marker.style.position = 'absolute';
        marker.style.left = '-20px';
        marker.style.top = '-50px';
        marker.style.transform = 'translate(-50%, -50%)';
        marker.innerHTML = `<img src=${HotelsPin} alt="Hotel Pin" style="width: 40px; height: 40px;">`;
        const hotelMarker = new window.google.maps.Marker({
          position: { lat: hotel.geometry.location.lat, lng: hotel.geometry.location.lng },
          map: mapRef.current.map_,
        });
        hotelMarker.addListener('click', () => {
          setSelectedPlace(hotel);
          setDetailsPosition({ x: 0, y: 0 });
        });
        hotelMarker.setMap(mapRef.current.map_);
        hotelMarker.setIcon({
          url: marker,
          scaledSize: new window.google.maps.Size(40, 40),
        });
      });
    }
  };

  useEffect(() => {
    handleFetchHotels();
  }, [hotels]);

  return (
    <MapContainerStyled ref={mapRef} style={style}>
      <MapLegend />
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={mapSettings.center}
        zoom={mapSettings.zoom}
        onClick={({ x, y }) => setDetailsPosition({ x, y })}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          handleFetchHotels();
        }}
      >
        {places.map((place, index) => (
          <Marker
            key={`${place.place_id}-${index}`}
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
            onClick={(e) =>
              handleMarkerClick(place, { x: e.clientX, y: e.clientY })
            }
          >
            <PinStyled
              shouldBounce={shouldBounce}
              src={getPinForPlace(place)}
              alt={place.name}
            />
          </Marker>
        ))}
      </GoogleMapReact>
    </MapContainerStyled>
  );
};

export default MapContainer;
