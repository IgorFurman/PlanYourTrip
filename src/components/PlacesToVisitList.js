import React from 'react';
import { List, ListItem, ButtonList, ListContainer } from '../styles';

const generateDownloadContent = (placesToVisit) => {
	let content = '';
	placesToVisit.forEach((place, index) => {
		content += `Miejsce ${index + 1}:\n`;
		content += `Nazwa: ${place.name}\n`;
		content += `Adres: ${place.formatted_address}\n`;
		content += `Ocena: ${place.rating ? `${place.rating} ⭐` : 'Brak oceny'}\n`;
		content += '\n';
	});
	return content;
};
const PlacesToVisitList = ({ placesToVisit, removeFromVisit, currentCity }) => {
	const downloadContent = generateDownloadContent(placesToVisit);
	const blob = new Blob([downloadContent], { type: "text/plain" });
	const downloadUrl = URL.createObjectURL(blob);

	const handleRemoveFromVisit = (placeId) => {
		removeFromVisit(placeId);
	};

	if (!placesToVisit || placesToVisit.length === 0) {
		return <div>Brak miejsc do odwiedzenia</div>;
	}

	return (
		<ListContainer>
			<h2>{currentCity} - Lista miejsc do odwiedzenia</h2>
      <a href={downloadUrl} download={`${currentCity}_places_to_visit.txt`}>
				Pobierz listę miejsc do odwiedzenia
			</a>
			<List>
				{placesToVisit.map((place, index) => (
					<ListItem key={`${place.place_id}-${index}`}>
						<div>
							<strong>{place.name}</strong>
							<p>Adres: {place.formatted_address}</p>
							<p>Ocena: {place.rating ? `${place.rating} ⭐` : 'Brak oceny'}</p>
							<ButtonList onClick={() => handleRemoveFromVisit(place.place_id)}>
								Usuń z listy do odwiedzenia
							</ButtonList>
						</div>
					</ListItem>
				))}
			</List>
		</ListContainer>
	);
};

export default PlacesToVisitList;
