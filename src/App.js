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
import {MapRefProvider} from './utils/map/MapRefContext'

import { Container, GlobalStyle } from './styles/styles';

const App = () => {
	const searchBarRef = useRef(null);

	return (
		<MapRefProvider>
		<ScrollProvider>
			<GlobalStyle />
			<SearchBar ref={searchBarRef} />
			<Container>
				<MapContainer style={{ gridArea: 'map' }} />
				<PlaceDetails style={{ gridArea: 'details' }} />
				<AttractionsList style={{ gridArea: 'attractions' }} />
				<HotelsList style={{ gridArea: 'hotels' }} />
				<RestaurantsList style={{ gridArea: 'restaurants' }} />
				<PlacesToVisitList style={{ gridArea: 'visit' }} />
				<WeatherDisplay />
			</Container>
			<Footer />
		</ScrollProvider>
		</MapRefProvider>
	);
};

export default App;
