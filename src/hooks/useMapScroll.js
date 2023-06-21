import { useDispatch } from 'react-redux';
import { setHasScrolled } from '../redux&saga/scrollSlice';
import {
	setShouldBounce,
	setSelectedPlace,
	setMapSettings,
	resetShouldBounce,
	setSelectedPinId,
} from '../redux&saga/placesDisplaySlice';
import { useMapRef } from '../utils/map/MapRefContext';

const useMapScroll = () => {
	const dispatch = useDispatch();
	const mapRef = useMapRef();

	const handleScroll = () => {
		dispatch(setHasScrolled(true));
	};

	const resetScroll = () => {
		dispatch(setHasScrolled(false));
	};

	const handleShowOnMapClick = (place) => {
		dispatch(setShouldBounce(true));
		dispatch(setSelectedPlace(place));
		const newCenter = {
			lat: place.geometry.location.lat,
			lng: place.geometry.location.lng,
		};
		dispatch(
			setMapSettings({
				center: newCenter,
			})
		);
		dispatch(setSelectedPinId(place.place_id));
		handleScroll();

		if (mapRef.current) {
			mapRef.current.panTo(newCenter);
			mapRef.current.setZoom(18);
		}

		setTimeout(() => {
			dispatch(setShouldBounce(true));
		}, 700);

		setTimeout(() => {
			dispatch(resetShouldBounce());
			resetScroll();
		}, 1200);
	};

	return handleShowOnMapClick;
};

export default useMapScroll;
