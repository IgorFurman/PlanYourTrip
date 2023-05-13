import React from 'react';
import { Container, ButtonList, Input, List, ListItem } from '../styles'
const HotelsList = ({ hotels, setCenter, setZoom }) => {
  const handleShowOnMapClick = (hotel) => {
  setCenter({
    lat: hotel.geometry.location.lat,
    lng: hotel.geometry.location.lng,
  });
  setZoom(18);
};

  if (!hotels || hotels.length === 0) {
    return <div>Brak hoteli</div>;
  }

  return (
    <div>
      <h2>Hotele:</h2>
      <List>
        {hotels.map((hotel, index) => (
          <ListItem key={`${hotel.place_id}- ${index}`}>
            <div>
              <strong>{hotel.name}</strong>
              <p>Adres: {hotel.formatted_address}</p>
              <p>Ocena: {hotel.rating ? `${hotel.rating} ⭐` : 'Brak oceny'}</p>
             
              <ButtonList onClick={() => handleShowOnMapClick(hotel)}>Pokaż na mapie</ButtonList>
            </div>
          </ListItem>
        ))}
      </List>
      </div>
);
};
export default HotelsList;