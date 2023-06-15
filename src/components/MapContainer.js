import React, { useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  MapContainerStyled,
  PinStyled,
} from '../styles/styles.js';
import MapLegend from './MapLegend';
import AttractionsPin from '../images/AttractionsPin.png';
import HotelsPin from '../images/HotelsPin.png';
import RestaurantsPin from '../images/RestaurantsPin.png';

import { useSelector, useDispatch } from 'react-redux';
import { setHotels, setSelectedPlace, setSelectedPlacePosition } from '../redux/placesDisplaySlice';

const MapContainer = ({ style, shouldBounce }) => {
  const mapRef = useRef();
  


  const places = useSelector((state) => state.placesDisplay.places);
  const selectedPlace = useSelector((state) => state.placesDisplay.selectedPlace);
  const mapSettings = useSelector((state) => state.placesDisplay.mapSettings);
  const hotels = useSelector((state) => state.placesDisplay.hotels);
  const restaurants = useSelector((state) => state.placesDisplay.restaurants);
  const allPlaces = [...places, ...hotels, ...restaurants];

  const dispatch = useDispatch();

  const handleMarkerClick = (place, { x, y }) => {
    dispatch(setSelectedPlace(place)); 
    dispatch(setSelectedPlacePosition({ x, y }));
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

  useEffect(() => {
    console.log(places);
}, [places]);

  const getPinForPlace = (places) => {
    const types = places.types;

    if (types.some(type => ['lodging', 'hotel'].includes(type))) {
      return HotelsPin;
    } else if (types.includes('restaurant')) {
      return RestaurantsPin;
    } else if (types.includes('tourist_attraction')) {
      return AttractionsPin;
    }
    return AttractionsPin;
  };

  const handleFetchHotels = () => {
    if (hotels.length > 0) {
      hotels.forEach((hotel) => {
        const hotelMarker = new window.google.maps.Marker({
          position: { lat: hotel.geometry.location.lat, lng: hotel.geometry.location.lng },
          map: mapRef.current.map_,
        });
        hotelMarker.addListener('click', () => {
          dispatch(setSelectedPlace(hotel)); 
          dispatch(setSelectedPlacePosition({ x: 0, y: 0 })); 
        });
        hotelMarker.setMap(mapRef.current.map_);
        
        hotelMarker.setIcon({
          url: HotelsPin,
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
        onClick={({ x, y }) => dispatch(setSelectedPlacePosition({ x, y }))}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          handleFetchHotels();
        }}
      >
        {allPlaces.map((place, index) => (
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
