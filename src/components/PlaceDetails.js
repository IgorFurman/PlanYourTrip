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
  OpinionsWrapper
} from '../styles/styles';

const PlaceDetails = ({
  addToVisit,
  removeFromVisit,
  placesToVisit,
  style,
  place = {
    place_id: 'default_id',
    name: 'default_name',
    formatted_address: 'default_address',
    formatted_phone_number: 'default_number',
  },
}) => {
  const [detailedPlace, setDetailedPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!place) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/place/details?placeId=${place.place_id}`
        );

        if (!response.ok) {
          throw new Error('Problem z odpowiedzią serwera');
        }

        const data = await response.text();
        if (!data) {
          throw new Error('Brak danych do przetworzenia');
        }

        const jsonData = JSON.parse(data);
        setDetailedPlace(jsonData);
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };

    fetchPlaceDetails();
  }, [place.place_id]);

  const isPlaceInVisitList = (placeId) => {
    return placesToVisit.some((place) => place.place_id === placeId);
  };

  if (!detailedPlace) {
    return (
      <PlaceDetailsStyled style={style}>
        <h2>Tutaj zobaczysz szczegóły danej lokalizacji po kliknięciu w pineskę</h2>
      </PlaceDetailsStyled>
    );
  }

  return (
    <PlaceDetailsStyled style={style}>
      <h2>{detailedPlace.name}</h2>
      <p>
        <b>Adres: </b>
        {detailedPlace.formatted_address}
      </p>
      <p>
        <b>Numer: </b>
        {detailedPlace.formatted_phone_number}
      </p>

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
          <WebsideLink
            target="_blank"
            href={detailedPlace.website}
            rel="noopener noreferrer"
          >
            Dowiedz się więcej
          </WebsideLink>
        </p>
      )}

      {detailedPlace.photos && detailedPlace.photos.length > 0 ? (
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
        <OpinionsWrapper>
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
        </OpinionsWrapper>
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
    </PlaceDetailsStyled>
  );
};

export default PlaceDetails;

