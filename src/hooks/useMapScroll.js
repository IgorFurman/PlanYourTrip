import { useDispatch } from 'react-redux';
import {
  setHasScrolled,
  
} from '../redux/scrollSlice';
import {
  setShouldBounce,
  setSelectedPlace,
  setMapSettings,
  resetShouldBounce,
  setSelectedPinId,
} from '../redux/placesDisplaySlice';

const useMapScroll = () => {
  const dispatch = useDispatch();

  const handleScroll = () => {
    dispatch(setHasScrolled(true));
  }

  const resetScroll = () => {
    dispatch(setHasScrolled(false));
  }

  const handleShowOnMapClick = (place) => {
    dispatch(setShouldBounce(true));
    dispatch(setSelectedPlace(place));
    dispatch(setMapSettings({
      center: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      zoom: 18,
    }));
    dispatch(setSelectedPinId(place.place_id));
    handleScroll();

    setTimeout(() => {
      dispatch(resetShouldBounce());
      resetScroll();
    }, 500);
  };

  return handleShowOnMapClick;
};

export default useMapScroll;