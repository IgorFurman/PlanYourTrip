import React from 'react';
import { LegendContainer, LegendItem, LegendPin, LegendLabel } from '../styles.js'; 
import AttractionsPin from '../images/AttractionsPin.png';
import HotelsPin from '../images/HotelsPin.png';
import RestaurantsPin from '../images/RestaurantsPin.png';
const MapLegend = () => {
	return (
		<LegendContainer>
			<LegendItem>
				<LegendPin src={AttractionsPin} />
				<LegendLabel>Attractions</LegendLabel>
			</LegendItem>
			<LegendItem>
				<LegendPin src={HotelsPin} />
				<LegendLabel>Hotels</LegendLabel>
			</LegendItem>
			<LegendItem>
				<LegendPin src={RestaurantsPin} />
				<LegendLabel>Restaurants</LegendLabel>
			</LegendItem>
		</LegendContainer>
	);
};

export default MapLegend;
