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

import { ScrollProvider } from './utils/scrollContext/ScrollContext';

import { Container, GlobalStyle } from './styles/styles';

import { addToVisit, removeFromVisit } from './redux/placesToVisitSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
	setPlaces,
	setMapSettings,

} from './redux/placesDisplaySlice';

const App = () => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesDisplayToVisit);

	const [selectedPlace, setSelectedPlace] = useState(null);
	const places = useSelector((state) => state.placesDisplay.places);
	const lastSearchedCity = useSelector(
		(state) => state.placesDisplay.lastSearchedCity
	);
	const lastSearchedCoordinates = useSelector(
		(state) => state.placesDisplay.lastSearchedCoordinates
	);
	const [weatherCity, setWeatherCity] = useState(null);
	const [hotels, setHotels] = useState([]);
	const [restaurants, setRestaurants] = useState([]);

	const mapSettings = useSelector((state) => state.placesDisplay.mapSettings);
	const [isCitySearched, setIsCitySearched] = useState(false);
	const [shouldBounce, setShouldBounce] = useState(false);

	const hotelsListRef = useRef(null);
	const restaurantsListRef = useRef();
	const mapContainerRef = useRef(null);

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

	const handleSearchBarInput = (city) => {
		setWeatherCity(city);
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
	};

	return (
		<ScrollProvider>
			<GlobalStyle />
			<SearchBar
				
				mapContainerRef={mapContainerRef}
				handleSearchBarInput={handleSearchBarInput}
			/>
			<Container>
				<MapContainer
					forwardRef={mapContainerRef}
					style={{ gridArea: 'map' }}
					setShouldBounce={setShouldBounce}
					shouldBounce={shouldBounce}
					
				/>

				<PlaceDetails
					style={{ gridArea: 'details' }}
					place={selectedPlace || defaultPlace}
					
				/>

				<AttractionsList
					style={{ gridArea: 'attractions' }}
					places={places}
					
					
					
					
					
					setShouldBounce={setShouldBounce}
					mapContainerRef={mapContainerRef}
				/>
				<div ref={hotelsListRef} style={{ gridArea: 'hotels' }}>
					<HotelsList
						hotels={hotels}
						setShouldBounce={setShouldBounce}
				
					
					/>
				</div>
				<div ref={restaurantsListRef} style={{ gridArea: 'restaurants' }}>
					<RestaurantsList
						restaurants={restaurants}
						
						setShouldBounce={setShouldBounce}
						
					/>
				</div>
				<PlacesToVisitList
					style={{ gridArea: 'visit' }}
					
				/>
				<WeatherDisplay city={weatherCity} />
			</Container>
			<Footer />
		</ScrollProvider>
	);
};

export default App;
