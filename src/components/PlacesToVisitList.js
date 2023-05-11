import React from 'react';
import { List, ListItem, ButtonList } from '../styles.js';

const PlacesToVisitList = ({ placesToVisit, removeFromVisit }) => {

  const handleRemoveFromVisit = (placeId) => {
    removeFromVisit(placeId);
  };

  if (!placesToVisit || placesToVisit.length === 0) {
    return <div>Brak miejsc do odwiedzenia</div>;
  }

  return (
    <div>
      <h2>Lista miejsc do odwiedzenia:</h2>
      <List>
        {placesToVisit.map((place, index) => (
          <ListItem key={`${place.place_id}-${index}`}>
            <div>
              <strong>{place.name}</strong>
              <p>Adres: {place.formatted_address}</p>
              <p>
                Ocena: {place.rating ? `${place.rating} ⭐` : 'Brak oceny'}
              </p>
              <ButtonList onClick={() => handleRemoveFromVisit(place.place_id)}>
                Usuń z listy do odwiedzenia
              </ButtonList>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PlacesToVisitList;
