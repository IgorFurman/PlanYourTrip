import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapContainerStyled, PinStyled } from '../styles/styles.js';
import MapLegend from './MapLegend';
import AttractionsPin from '../images/AttractionsPin.png';
import HotelsPin from '../images/HotelsPin.png';
import RestaurantsPin from '../images/RestaurantsPin.png';

import { useSelector, useDispatch } from 'react-redux';
import {
	setHotels,
	setSelectedPlace,
	setSelectedPlacePosition,
	setShouldBounce,
	resetShouldBounce,
	setSelectedPinId,
} from '../redux/placesDisplaySlice';

const MapContainer = ({ style }) => {
	
	const dispatch = useDispatch();
	const mapRef = useRef();

	const places = useSelector((state) => state.placesDisplay.places);
	const selectedPlace = useSelector(
		(state) => state.placesDisplay.selectedPlace
	);
	const mapSettings = useSelector((state) => state.placesDisplay.mapSettings);
	const hotels = useSelector((state) => state.placesDisplay.hotels);
	const restaurants = useSelector((state) => state.placesDisplay.restaurants);
	const allPlaces = [...places, ...hotels, ...restaurants];

	const shouldBounce = useSelector((state) => state.placesDisplay.shouldBounce);
	const selectedPinId = useSelector(
		(state) => state.placesDisplay.selectedPinId
	);


	const handleMarkerClick = (place, { x, y }) => {
		dispatch(setSelectedPlace(place));
		dispatch(setSelectedPlacePosition({ x, y }));
		mapRef.current.setZoom(18);
		mapRef.current.panTo({
			lat: place.geometry.location.lat,
			lng: place.geometry.location.lng,
		});
		dispatch(setShouldBounce(true));
		dispatch(setSelectedPinId(place.place_id));
	};

	useEffect(() => {
		if (shouldBounce) {
			const timer = setTimeout(() => {
				dispatch(resetShouldBounce());
				dispatch(setSelectedPinId(null));
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [shouldBounce, dispatch]);

	const Marker = ({ children, shouldBounce, ...props }) => {
    const validProps = Object.keys(props).reduce((acc, key) => {
        if (!key.startsWith('$')) {
            acc[key] = props[key];
        }
        return acc;
    }, {});

    return <div {...validProps}>{children}</div>;
};

	const getPinForPlace = (places) => {
		const types = places.types;

		if (types.some((type) => ['lodging', 'hotel'].includes(type))) {
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
					position: {
						lat: hotel.geometry.location.lat,
						lng: hotel.geometry.location.lng,
					},
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
        onClick={(e) => handleMarkerClick(place, { x: e.clientX, y: e.clientY })}
    >
        <PinStyled
            onClick={(e) => handleMarkerClick(place, { x: e.clientX, y: e.clientY })}
            shouldBounce={shouldBounce && selectedPinId === place.place_id}
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
