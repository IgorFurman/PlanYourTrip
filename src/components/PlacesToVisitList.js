import React from 'react';
import {
	List,
	ListItem,
	ButtonList,
	ListContainer,
	DownloadList,
} from '../styles/styles';

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
const PlacesToVisitList = ({
	placesToVisit,
	removeFromVisit,
	currentCity,
	style,
}) => {
	const downloadContent = generateDownloadContent(placesToVisit);
	const blob = new Blob([downloadContent], { type: 'text/plain' });
	const downloadUrl = URL.createObjectURL(blob);

	const handleRemoveFromVisit = (placeId) => {
		removeFromVisit(placeId);
	};

	return (
		<ListContainer style={style}>
			<h2>{currentCity} lista miejsc do odwiedzenia</h2>
			{placesToVisit.length > 0 ? (
				<>
					<DownloadList
						href={downloadUrl}
						download={`${currentCity}_places_to_visit.txt`}
					>
						Pobierz listę
					</DownloadList>
					<List>
						{placesToVisit.map((place, index) => (
							<ListItem key={`${place.place_id}-${index}`}>
								<div>
									<strong>{place.name}</strong>
									<p>Adres: {place.formatted_address}</p>
									<p>
										Ocena: {place.rating ? `${place.rating} ⭐` : 'Brak oceny'}
									</p>
									<ButtonList
										onClick={() => handleRemoveFromVisit(place.place_id)}
									>
										Usuń z listy do odwiedzenia
									</ButtonList>
								</div>
							</ListItem>
						))}
					</List>
				</>
			) : (
				<p>Dodaj miejsca do odwiedzenia</p>
			)}
		</ListContainer>
	);
};

export default PlacesToVisitList;
