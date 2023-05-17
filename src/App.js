import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';
import HotelsList from './components/HotelsList';
import RestaurantsList from './components/RestaurantsList';
import PlaceDetails from './components/PlaceDetails';
import PlacesToVisitList from './components/PlacesToVisitList';
import Footer from './components/Footer';

import { ScrollProvider } from './components/ScrollContext';

import { Container, GlobalStyle } from './styles';

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
	const [isCitySearched, setIsCitySearched] = useState(false);
	const [shouldBounce, setShouldBounce] = useState(false);

	const hotelsListRef = useRef(null);
	const restaurantsListRef = useRef();

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

	const handleShowHotels = () => {
		if (hotelsListRef.current) {
			hotelsListRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleShowRestaurants = () => {
		if (restaurantsListRef.current) {
			restaurantsListRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const addPlaces = (newPlaces) => {
		setPlaces((prevPlaces) => [...prevPlaces, ...newPlaces]);
	};

	useEffect(() => {
		if (shouldBounce) {
			const timer = setTimeout(() => {
				setShouldBounce(false);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [shouldBounce]);

	const defaultPlace = {
		place_id: '0',
	}
	return (
		<ScrollProvider>
			<GlobalStyle />
			<SearchBar
				setPlaces={setPlaces}
				setMapSettings={setMapSettings}
				setLastSearchedCity={setLastSearchedCity}
				setLastSearchedCoordinates={setLastSearchedCoordinates}
				setSelectedPlace={setSelectedPlace}
				setHotels={setHotels}
				setRestaurants={setRestaurants}
				setIsCitySearched={setIsCitySearched}
				handleShowRestaurants={handleShowRestaurants}
				handleShowHotels={handleShowHotels}
				addPlaces={addPlaces}
				isCitySearched={isCitySearched}
			/>
			<Container>
				
				<MapContainer
					style={{ gridArea: 'map' }}
					setSelectedPlace={handleSetSelectedPlace}
					places={places}
					mapSettings={mapSettings}
					setShouldBounce={setShouldBounce}
					shouldBounce={shouldBounce}
				/>
				
					<PlaceDetails
						style={{ gridArea: 'details' }}
						place={selectedPlace || defaultPlace}
						addToVisit={addToVisit}
						removeFromVisit={removeFromVisit}
						placesToVisit={placesToVisit}
					/>
		
				<AttractionsList
					style={{ gridArea: 'attractions' }}
					places={places}
					setMapSettings={setMapSettings}
					setSelectedPlace={setSelectedPlace}
					placesToVisit={placesToVisit}
					addToVisit={addToVisit}
					removeFromVisit={removeFromVisit}
					setShouldBounce={setShouldBounce}
				/>
				<div ref={hotelsListRef} style={{ gridArea: 'hotels' }}>
					<HotelsList
						hotels={hotels}
						addToVisit={addToVisit}
						removeFromVisit={removeFromVisit}
						setMapSettings={setMapSettings}
						setSelectedPlace={setSelectedPlace}
						setShouldBounce={setShouldBounce}
					/>
				</div>
				<div ref={restaurantsListRef} style={{ gridArea: 'restaurants' }}>
					<RestaurantsList
						restaurants={restaurants}
						addToVisit={addToVisit}
						removeFromVisit={removeFromVisit}
						setMapSettings={setMapSettings}
						setSelectedPlace={setSelectedPlace}
						setShouldBounce={setShouldBounce}
					/>
				</div>
				<PlacesToVisitList
					style={{ gridArea: 'visit' }}
					placesToVisit={placesToVisit}
					removeFromVisit={removeFromVisit}
					currentCity={lastSearchedCity}
				/>
				<WeatherDisplay
					style={{ gridArea: 'weather' }}
					city={lastSearchedCity}
				/>
			</Container>
			<Footer />
		</ScrollProvider>
	);
};

export default App;
