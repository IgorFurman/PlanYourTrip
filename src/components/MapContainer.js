import React, { useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {
	MapContainerStyled,
	PinStyled,
	InfoWindowStyled,
	DetailsContainer,
} from '../styles.js';
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
	const getPinForPlace = (place) => {
    if (place.types.includes('lodging')) {
        return HotelsPin;
    }
    if (place.types.includes('restaurant')) {
        return RestaurantsPin;
    }
    if (place.types.includes('tourist_attraction')) {
        return AttractionsPin;
    }
    return AttractionsPin; // domyślny przypadek
};
	return (
		<MapContainerStyled ref={mapRef}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
				center={mapSettings.center}
				zoom={mapSettings.zoom}
				onClick={({ x, y }) => setDetailsPosition({ x, y })}
			>
				{places.map((place, index) => (
					<div
						key={place.place_id}
						lat={place.geometry.location.lat}
						lng={place.geometry.location.lng}
						onClick={(e) =>
							handleMarkerClick(place, { x: e.clientX, y: e.clientY })
						}
					>
						<PinStyled src={getPinForPlace(place)} alt={place.name} />
					</div>
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
					{/* <PlaceDetails place={selectedPlace} /> */}
				</DetailsContainer>
			)}
		</MapContainerStyled>
	);
};

export default MapContainer;
