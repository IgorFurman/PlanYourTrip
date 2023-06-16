import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
	ButtonList,
	PlaceDetailsStyled,
	CarouselWrapper,
	CarouselItem,
	CarouselImage,
	OpeningHours,
	WebsideLink,
	OpinionsWrapper,
} from '../styles/styles';

import { useDispatch, useSelector } from 'react-redux';
import { addToVisit, } from '../redux/placesToVisitSlice';

import { FETCH_PLACE_DETAILS } from '../redux/sagas'; 

const PlaceDetails = ({ style }) => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);

  const selectedPlace = useSelector(state => state.placesDisplay.selectedPlace);

	const handleAddToVisit = (place) => {
		dispatch(addToVisit(place));
	};

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	}

	useEffect(() => {
		if (selectedPlace && selectedPlace.place_id) {
			dispatch({ type: FETCH_PLACE_DETAILS, payload: selectedPlace.place_id });
		}
	}, [selectedPlace?.place_id, dispatch]);


	if (!selectedPlace) {
		return (
			<PlaceDetailsStyled style={style}>
				<h2>
					Tutaj zobaczysz szczegóły danej lokalizacji po kliknięciu w pineskę
				</h2>
			</PlaceDetailsStyled>
		);
	}

	return (
		<PlaceDetailsStyled style={style}>
			<h2>{selectedPlace.name}</h2>
			<p>
				<b>Adres: </b>
				{selectedPlace.formatted_address}
			</p>
			<p>
				<b>Numer: </b>
				{selectedPlace.formatted_phone_number}
			</p>

			{selectedPlace.opening_hours && selectedPlace.opening_hours.weekday_text && (
	<OpeningHours>
		<p>Godziny otwarcia:</p>
		<ul>
			{selectedPlace.opening_hours.weekday_text.map((day, index) => (
				<li key={index}>{day}</li>
			))}
		</ul>
	</OpeningHours>
)}

			{selectedPlace.website && (
				<p>
					<WebsideLink
						target='_blank'
						href={selectedPlace.website}
						rel='noopener noreferrer'
					>
						Dowiedz się więcej
					</WebsideLink>
				</p>
			)}

			{selectedPlace.photos && selectedPlace.photos.length > 0 ? (
				<CarouselWrapper>
					<Carousel
						autoPlay
						dynamicHeight
						emulateTouch
						infiniteLoop
						interval={3000}
						showArrows
						showStatus={false}
						showIndicators
						stopOnHover
						swipeable
						transitionTime={350}
						useKeyboardArrows
						showThumbs={false}
					>
						{selectedPlace.photos.map((photo, index) => (
							<CarouselItem key={index}>
								<CarouselImage
									src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
									alt={selectedPlace.name}
								/>
							</CarouselItem>
						))}
					</Carousel>
				</CarouselWrapper>
			) : (
				<p>Brak zdjęcia</p>
			)}

			{selectedPlace.rating && <p>Ocena ogólna: {selectedPlace.rating}⭐</p>}

			{selectedPlace.reviews && selectedPlace.reviews.length > 0 && (
				<OpinionsWrapper>
					<h3>Opinie:</h3>
					<Carousel>
						{selectedPlace.reviews.map((review, index) => (
							<div key={index}>
								<p>
									{review.author_name} ({review.rating}⭐):
								</p>
								<p>{review.text}</p>
							</div>
						))}
					</Carousel>
				</OpinionsWrapper>
			)}

			<ButtonList
				onClick={() => handleAddToVisit(selectedPlace)}
				disabled={isPlaceInVisitList(selectedPlace.place_id)}
			>
				Dodaj do listy do odwiedzenia
			</ButtonList>
		</PlaceDetailsStyled>
	);
};

export default PlaceDetails;
