import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHasScrolled, setHasScrolled } from '../../redux/scrollSlice';



const ScrollProvider = ({ children }) => {
  const searchBarHeight = useSelector(state => state.scroll.searchBarHeight);
  const hasScrolled = useSelector(selectHasScrolled);
  const dispatch = useDispatch();
  const isFetchingPlaces = useSelector(
    (state) => state.placesDisplay.isFetchingPlaces
  );

  useEffect(() => {
  
    if (hasScrolled && !isFetchingPlaces) {
      window.scrollTo({
        top: searchBarHeight,
        behavior: 'smooth',
      });
      dispatch(setHasScrolled(false)) 
     
      
    }
  }, [hasScrolled, isFetchingPlaces, dispatch]);
  return <div>{children}</div>;
};

export default ScrollProvider;