import React, { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import MapContainer from './components/MapContainer';
import AttractionsList from './components/AttractionsList';
import HotelsList from './components/HotelsList';
import RestaurantsList from './components/RestaurantsList';
import PlaceDetails from './components/PlaceDetails';
import PlacesToVisitList from './components/PlacesToVisitList';
import Footer from './components/Footer';

import ScrollProvider from './utils/scroll/Scroll';

import { Container, GlobalStyle } from './styles/styles';


const App = () => {
	const [weatherCity, setWeatherCity] = useState(null);

const searchBarRef = useRef(null)
	const handleSearchBarInput = (city) => {
		setWeatherCity(city);
	};

	return (
		<ScrollProvider ref={searchBarRef}  >
			<GlobalStyle />
			<SearchBar  handleSearchBarInput={handleSearchBarInput} />
			<Container>
				<MapContainer 
				style={{ gridArea: 'map' }} />
				<PlaceDetails 
				style={{ gridArea: 'details' }} />
				<AttractionsList 
				style={{ gridArea: 'attractions' }} />
				<div 
				style={{ gridArea: 'hotels' }}>
					<HotelsList />
				</div>
				<div 
				style={{ gridArea: 'restaurants' }}>
					<RestaurantsList />
				</div>
				<PlacesToVisitList 
				style={{ gridArea: 'visit' }} />
				<WeatherDisplay city={weatherCity} />
			</Container>
			<Footer />
		</ScrollProvider>
	);
};

export default App;
