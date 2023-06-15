import React, { useState, useContext } from 'react';
import {
	Container,
	ButtonList,
	Input,
	List,
	ListItem,
	ListContainer,
} from '../styles/styles';
import { ScrollContext } from '../utils/scrollContext/ScrollContext';

import { useSelector, useDispatch } from 'react-redux';

import { addToVisit } from '../redux/placesToVisitSlice';

const AttractionsList = ({
	places,
	setMapSettings,
	setSelectedPlace,


	style,
	setShouldBounce,
}) => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);
	const [lastSelectedPlace, setLastSelectedPlace] = useState(null);
	const [isListVisible, setIsListVisible] = useState(true);

	const { handleScroll, resetScroll } = useContext(ScrollContext);

	const handleAddToVisit = (place) => {
		dispatch(addToVisit(place));
	};

	

	const handleShowOnMapClick = (place) => {
		setShouldBounce(true);
		setSelectedPlace(place);
		setMapSettings({
			center: {
				lat: place.geometry.location.lat,
				lng: place.geometry.location.lng,
			},
			zoom: 18,
		});
		handleScroll();
		resetScroll();
	};

	const handleToggleListVisibility = () => {
		setIsListVisible(!isListVisible);
	};

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	return (
		<ListContainer style={style}>
			<h2>Atrakcje turystyczne:</h2>
			{places.length > 0 && (
				<ButtonList onClick={handleToggleListVisibility}>
					{isListVisible ? 'Zwiń listę' : 'Rozwiń listę'}
				</ButtonList>
			)}
			{isListVisible && (
				<List>
					{places.length > 0 ? (
						places.map((place, index) => (
							<ListItem key={`${place.place_id}-${index}`}>
								<div>
									<h3>{place.name}</h3>
									<p>
										<b>Adres: </b>
										{place.formatted_address}
									</p>
									<p>
										<b>Ocena: </b>
										{place.rating ? `${place.rating} ⭐` : 'Brak oceny'}
									</p>
									<ButtonList onClick={() => handleShowOnMapClick(place)}>
										Pokaż na mapie
									</ButtonList>
								
										<ButtonList onClick={() => handleAddToVisit(place)}>
											Dodaj do listy do odwiedzenia
										</ButtonList>
									
								</div>
							</ListItem>
						))
					) : (
						<p>
							Tutaj zobaczysz atrakcje turystyczne dla wyszukiwanego miasta.
						</p>
					)}
				</List>
			)}
			{lastSelectedPlace && (
				<div>
					<h3>{lastSelectedPlace.name}</h3>
					<p>{lastSelectedPlace.formatted_address}</p>
				</div>
			)}
		</ListContainer>
	);
};

export default AttractionsList;
