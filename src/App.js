import React, {useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchBarAndTitleHeight, setHasScrolled } from './redux/scrollSlice';
import Title from './components/Title'
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
	const titleRef = useRef(null);
  const searchBarRef = useRef(null);

  const dispatch = useDispatch();

 

	const updateHeight = () => {
		if (titleRef.current && searchBarRef.current) {
			const height = titleRef.current.offsetHeight + searchBarRef.current.offsetHeight;
			dispatch(setSearchBarAndTitleHeight(height));
		}
	};

	useLayoutEffect(() => {
		window.addEventListener("resize", updateHeight);
		updateHeight(); 

		return () => {
			window.removeEventListener("resize", updateHeight);
		}
	}, []);



	return (
		<MapRefProvider>
		<ScrollProvider>
			<GlobalStyle />
			
				<Title ref={titleRef} />
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
