import React, { useEffect, useState } from 'react';
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
} from '../styles';

const PlaceDetails = ({
	place,
	addToVisit,
	removeFromVisit,
	placesToVisit,
}) => {
	const [detailedPlace, setDetailedPlace] = useState(null);

	useEffect(() => {
		const fetchPlaceDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/api/place/details?placeId=${place.place_id}`
				);
				const data = await response.json();
				setDetailedPlace(data);
			} catch (error) {
				console.error('Error fetching place details:', error);
			}
		};

		fetchPlaceDetails();
	}, [place.place_id]);

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	return (
		<PlaceDetailsStyled>
			{detailedPlace ? (
				<>
					<h2>{detailedPlace.name}</h2>

					<p>
						<b>Adres:</b>
						{detailedPlace.formatted_address}
					</p>

					{detailedPlace.formatted_phone_number && (
						<p>
							<b>Numer: </b>
							{detailedPlace.formatted_phone_number}
						</p>
					)}
					{detailedPlace.opening_hours && (
						<OpeningHours>
							<p>Godziny otwarcia:</p>
							<ul>
								{detailedPlace.opening_hours.weekday_text.map((day, index) => (
									<li key={index}>{day}</li>
								))}
							</ul>
						</OpeningHours>
					)}
					{detailedPlace.website && (
						<p>
							<WebsideLink href={detailedPlace.website}>
								Odnośnik do strony internetowej
							</WebsideLink>
						</p>
					)}
					{detailedPlace.photos && detailedPlace.photos.length > 0 ? (
						<CarouselWrapper>
							<Carousel
								autoPlay
								// centerMode
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
							>
								{detailedPlace.photos.map((photo, index) => (
									<CarouselItem key={index}>
										<CarouselImage
											src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${photo.photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
											alt={detailedPlace.name}
										/>
									</CarouselItem>
								))}
							</Carousel>
						</CarouselWrapper>
					) : (
						<p>Brak zdjęcia</p>
					)}

					{detailedPlace.rating && (
						<p>Ocena ogólna: {detailedPlace.rating}⭐</p>
					)}
					{detailedPlace.reviews && detailedPlace.reviews.length > 0 && (
						<div>
							<h3>Opinie:</h3>
							<Carousel>
								
								{detailedPlace.reviews.map((review, index) => (
									<div key={index}>
										<p>
											{review.author_name} ({review.rating}⭐):
										</p>
										<p>{review.text}</p>
									</div>
								))}
							</Carousel>
						</div>
					)}
					{!isPlaceInVisitList(place.place_id) ? (
						<ButtonList onClick={() => addToVisit(place)}>
							Dodaj do listy do odwiedzenia
						</ButtonList>
					) : (
						<ButtonList onClick={() => removeFromVisit(place.place_id)}>
							Usuń z listy do odwiedzenia
						</ButtonList>
					)}
				</>
			) : (
				<p>Loading...</p>
			)}
		</PlaceDetailsStyled>
	);
};

export default PlaceDetails;
