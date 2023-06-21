import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
import { addToVisit } from '../redux&saga/placesToVisitSlice';

import { AiOutlineLink, AiFillPhone, AiFillHome } from 'react-icons/ai';
import { BiTimeFive, BiShow } from 'react-icons/bi';

import { FETCH_PLACE_DETAILS } from '../redux&saga/sagas';

const PlaceDetails = ({ style }) => {
	const dispatch = useDispatch();
	const placesToVisit = useSelector((state) => state.placesToVisit);

	const selectedPlace = useSelector(
		(state) => state.placesDisplay.selectedPlace
	);

	const handleAddToVisit = (place) => {
		dispatch(addToVisit(place));
	};

	const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some((place) => place.place_id === placeId);
	};

	useEffect(() => {
		if (selectedPlace && selectedPlace.place_id) {
			dispatch({ type: FETCH_PLACE_DETAILS, payload: selectedPlace.place_id });
		}
	}, [selectedPlace?.place_id, dispatch]);

	const sliderOpinionsSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 8000,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	function PrevArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',
					color: 'gray',
					fontSize: '40px',
					lineHeight: '1',
					position: 'absolute',
					top: '50%',
					left: '-34px',
					transform: 'translateY(-50%)',
					cursor: 'pointer',
				}}
				onClick={onClick}
			>
				&#8249;
			</div>
		);
	}

	function NextArrow(props) {
		const { className, style, onClick } = props;
		return (
			<div
				className={className}
				style={{
					...style,
					display: 'block',
					color: 'gray',
					fontSize: '40px',
					lineHeight: '1',
					position: 'absolute',
					top: '50%',
					right: '2px',
					transform: 'translateY(-50%)',
					cursor: 'pointer',
				}}
				onClick={onClick}
			>
				&#8250;
			</div>
		);
	}

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
				<b>
					<AiFillHome /> Adres:{' '}
				</b>
				{selectedPlace.formatted_address
					? selectedPlace.formatted_address
					: 'Brak adresu'}
			</p>
			<p>
				<b>
					{' '}
					<AiFillPhone /> Numer:{' '}
				</b>
				{selectedPlace.formatted_phone_number
					? selectedPlace.formatted_phone_number
					: 'Brak numeru'}
			</p>

			{selectedPlace.opening_hours &&
				selectedPlace.opening_hours.weekday_text && (
					<OpeningHours>
						<p>
							<BiTimeFive /> Godziny otwarcia:
						</p>
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
						<AiOutlineLink />
						Poznaj więcej szczegółów...
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

			{selectedPlace.rating && (
				<p>
					<b>Ocena ogólna: </b>
					{selectedPlace.rating}⭐
				</p>
			)}

			{selectedPlace.reviews && selectedPlace.reviews.length > 0 ? (
				<OpinionsWrapper>
					<h3>Opinie:</h3>
					<Slider {...sliderOpinionsSettings}>
						{selectedPlace.reviews.map((review, index) => (
							<div key={index}>
								<p>
									{review.author_name} ({review.rating}⭐):
								</p>
								<p>{review.text}</p>
							</div>
						))}
					</Slider>
				</OpinionsWrapper>
			) : (
				<p>Brak opinii</p>
			)}

			<ButtonList
				style={{ margin: '50px 0 0 0' }}
				onClick={() => handleAddToVisit(selectedPlace)}
				disabled={isPlaceInVisitList(selectedPlace.place_id)}
			>
				Dodaj do listy do odwiedzenia
			</ButtonList>
		</PlaceDetailsStyled>
	);
};

export default PlaceDetails;
