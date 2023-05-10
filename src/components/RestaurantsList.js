import React from 'react';
import { Container, ButtonList, Input, List, ListItem } from '../styles.js'

const RestaurantsList = ({ restaurants, setCenter, setZoom }) => {
  const handleShowOnMapClick = (restaurant) => {
  setCenter({
    lat: restaurant.geometry.location.lat,
    lng: restaurant.geometry.location.lng,
  });
  setZoom(18);
};

  if (!restaurants || restaurants.length === 0) {
    return <div>Brak restauracji</div>;
  }

  return (
    <div>
      <h2>Restauracje:</h2>
      <List>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.place_id}>
            <div>
              <strong>{restaurant.name}</strong>
              <p>Adres: {restaurant.formatted_address}</p>
              <p>Ocena: {restaurant.rating ? `${restaurant.rating} ⭐` : 'Brak oceny'}</p>
              <a href={`https://www.google.com/search?q=${restaurant.name}`} target="_blank" rel="noreferrer">Więcej informacji</a>
              <ButtonList onClick={() => handleShowOnMapClick(restaurant)}>Pokaż na mapie</ButtonList>
            </div>
          </ListItem>
        ))}
      </List>
      </div>
);
};
export default RestaurantsList;
