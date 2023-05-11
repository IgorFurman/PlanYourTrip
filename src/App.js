import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';
import HotelSearch from './components/HotelSearch';
import HotelsList from './components/HotelsList';
import RestaurantSearch from './components/RestaurantSearch';
import RestaurantsList from './components/RestaurantsList';
import PlaceDetails from './components/PlaceDetails';
import PlacesToVisitList from './components/PlacesToVisitList';

import { Container } from './styles';

const App = () => {
	const [selectedPlace, setSelectedPlace] = useState(null);
	const [places, setPlaces] = useState([]);
	const [lastSearchedCity, setLastSearchedCity] = useState('London');
	const [lastSearchedCoordinates, setLastSearchedCoordinates] = useState({
		lat: 51.509865,
		lng: -0.118092,
	});
	const [hotels, setHotels] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [placesToVisit, setPlacesToVisit] = useState([]);
	const [mapSettings, setMapSettings] = useState({
		center: lastSearchedCoordinates,
		zoom: 15,
	});

	const handleSetSelectedPlace = (place) => {
		setSelectedPlace(place);
		setMapSettings({
			center: {
				lat: place.geometry.location.lat,
				lng: place.geometry.location.lng,
			},
			zoom: 15,
		});
	};
	const addToVisit = (place) => {
		setPlacesToVisit((prevPlaces) => [...prevPlaces, place]);
	};
	const removeFromVisit = (placeId) => {
		setPlacesToVisit((prevPlaces) =>
			prevPlaces.filter((place) => place.place_id !== placeId)
		);
	};

	return (
		<div>
			<SearchBar
				setPlaces={setPlaces}
				setMapSettings={setMapSettings}
				setLastSearchedCity={setLastSearchedCity}
				setLastSearchedCoordinates={setLastSearchedCoordinates}
			/>
			<HotelSearch setHotels={setHotels} lastSearchedCity={lastSearchedCity} />
			<RestaurantSearch
				setRestaurants={setRestaurants}
				lastSearchedCity={lastSearchedCity}
			/>
			<PlacesToVisitList
				placesToVisit={placesToVisit}
				removeFromVisit={removeFromVisit}
			/>
			<MapContainer
				setSelectedPlace={handleSetSelectedPlace}
				places={places}
				mapSettings={mapSettings}
			/>

			{/* {selectedPlace && <PlaceDetails place={selectedPlace} />} */}
			<AttractionsList
				places={places}
				setMapSettings={setMapSettings}
				setSelectedPlace={setSelectedPlace}
				placesToVisit={placesToVisit}
				addToVisit={addToVisit}
				removeFromVisit={removeFromVisit}
			/>
			<HotelsList
				hotels={hotels}
				addToVisit={addToVisit}
				removeFromVisit={removeFromVisit}
			/>
			<RestaurantsList
				restaurants={restaurants}
				addToVisit={addToVisit}
				removeFromVisit={removeFromVisit}
			/>
			{selectedPlace && (
				<PlaceDetails
					place={selectedPlace}
					addToVisit={addToVisit}
					removeFromVisit={removeFromVisit}
					placesToVisit={placesToVisit}
				/>
			)}
		</div>
	);
};

export default App;
