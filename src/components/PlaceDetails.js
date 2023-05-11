import React from 'react';
import {ButtonList} from '../styles'

const PlaceDetails = ({ place, addToVisit, removeFromVisit, placesToVisit }) => {
  const isPlaceInVisitList = (placeId) => {
		return placesToVisit.some(place => place.place_id === placeId);
	}
	return (
		<div>
			<h2>{place.name}</h2>
			<p>{place.formatted_address}</p>
			{place.rating && <p>Rating: {place.rating}</p>}
			{place.website && (
				<p>
					<a href={place.website}>Website</a>
				</p>
			)}
			{place.photos && place.photos.length > 0 && (
				<img src={place.photos[0]} alt={place.name} />
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
		</div>
	);
};

export default PlaceDetails;
