import React from 'react';

const RestaurantsList = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return <div>Brak restauracji</div>;
  }

  return (
    <div>
      <h2>Restauracje:</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id}>
            <div>
              <strong>{restaurant.name}</strong>
              <p>Adres: {restaurant.formatted_address}</p>
              <p>Ocena: {restaurant.rating ? `${restaurant.rating} ⭐` : 'Brak oceny'}</p>
              <a href={`https://www.google.com/search?q=${restaurant.name}`} target="_blank" rel="noreferrer">Więcej informacji</a>
            </div>
          </li>
        ))}
      </ul>
      </div>
  );
};

export default RestaurantsList;
