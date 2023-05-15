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
	return (
		<MapContainerStyled ref={mapRef}>
			<MapLegend />
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
				center={mapSettings.center}
				zoom={mapSettings.zoom}
				onClick={({ x, y }) => setDetailsPosition({ x, y })}
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
      <PinStyled src={getPinForPlace(place)} alt={place.name} />
    </Marker>
  ))}
			</GoogleMapReact>
			{selectedPlace && detailsPosition && (
				<DetailsContainer
					style={{
						position: 'absolute',
						top: detailsPosition.y,
						left: detailsPosition.x,
					}}
				>
				</DetailsContainer>
			)}
		</MapContainerStyled>
	);
};

export default MapContainer;