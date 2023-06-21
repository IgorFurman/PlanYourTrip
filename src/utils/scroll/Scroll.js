import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectHasScrolled,
	setHasScrolled,
} from '../../redux&saga/scrollSlice';

const ScrollProvider = ({ children }) => {
	const searchBarAndTitleHeight = useSelector(
		(state) => state.scroll.searchBarAndTitleHeight
	);
	const hasScrolled = useSelector(selectHasScrolled);
	const dispatch = useDispatch();

	useEffect(() => {
		if (hasScrolled) {
			console.log('Scrolling to:', searchBarAndTitleHeight);
			window.scrollTo({
				top: searchBarAndTitleHeight,
				behavior: 'smooth',
			});
			dispatch(setHasScrolled(false));
		}
	}, [hasScrolled, searchBarAndTitleHeight, dispatch]);
	return <div>{children}</div>;
};

export default ScrollProvider;
