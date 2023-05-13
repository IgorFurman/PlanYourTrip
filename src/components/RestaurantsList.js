import React from 'react';
import { Container, ButtonList, Input, List, ListItem } from '../styles'

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
        {restaurants.map((restaurant, index) => (
          <ListItem key={`${restaurant.place_id}-${index}`}>
            <div>
              <strong>{restaurant.name}</strong>
              <p>Adres: {restaurant.formatted_address}</p>
              <p>Ocena: {restaurant.rating ? `${restaurant.rating} ⭐` : 'Brak oceny'}</p>
             
              <ButtonList onClick={() => handleShowOnMapClick(restaurant)}>Pokaż na mapie</ButtonList>
            </div>
          </ListItem>
        ))}
      </List>
      </div>
);
};
export default RestaurantsList;
