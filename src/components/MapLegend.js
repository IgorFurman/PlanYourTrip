import React from 'react';
import { LegendContainer, LegendItem, LegendPin, LegendLabel } from '../styles/styles.js'; 
import AttractionsPin from '../images/AttractionsPin.png';
import HotelsPin from '../images/HotelsPin.png';
import RestaurantsPin from '../images/RestaurantsPin.png';
const MapLegend = () => {
	return (
		<LegendContainer>
			<LegendItem>
				<LegendPin src={AttractionsPin} />
				<LegendLabel>- Atrakcje</LegendLabel>
			</LegendItem>
			<LegendItem>
				<LegendPin src={HotelsPin} />
				<LegendLabel>- Hotele</LegendLabel>
			</LegendItem>
			<LegendItem>
				<LegendPin src={RestaurantsPin} />
				<LegendLabel>- Restauracje</LegendLabel>
			</LegendItem>
		</LegendContainer>
	);
};

export default MapLegend;
