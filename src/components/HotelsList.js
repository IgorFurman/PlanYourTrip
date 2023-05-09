import React from 'react';
import { Container, Button, Input, List, ListItem } from '../styles.js'
const HotelsList = ({ hotels }) => {
    if (!hotels || hotels.length === 0) {
      return <div>Brak hoteli</div>;
    }
  
    return (
      <div>
        <h2>Hotele:</h2>
        <List>
          {hotels.map((hotel) => (
            <ListItem key={hotel.place_id}>
              <div>
                <strong>{hotel.name}</strong>
                <p>Adres: {hotel.formatted_address}</p>
                <p>Ocena: {hotel.rating ? `${hotel.rating} ⭐` : 'Brak oceny'}</p>
                <a href={`https://www.google.com/search?q=${hotel.name}`} target="_blank" rel="noreferrer">Więcej informacji</a>
              </div>
            </ListItem>
          ))}
        </List>
        </div>
  );
};
export default HotelsList;